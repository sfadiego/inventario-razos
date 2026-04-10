<?php

namespace App\Imports;

use App\Enums\ProductoUnidadEnum;
use App\Enums\TipoMovimientoEnum;
use App\Enums\TipoProductoEnum;
use App\Models\Categoria;
use App\Models\ImagenProducto;
use App\Models\Marca;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Subcategoria;
use App\Models\Ubicacion;
use App\Traits\Movimientos;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Events\BeforeSheet;

class ImportProducto implements ToModel, WithCalculatedFormulas, WithEvents, WithStartRow
{
    use Movimientos;

    public array $inserted = [];

    public bool $validateDuplicateProduct = false;

    public array $subcategoria = [];

    public string $categoria = '';

    public array $importInfo = [];

    public array $duplicates = [];

    public array $errors = [];

    public array $existingProducts;

    public function startRow(): int
    {
        return 2;
    }

    public function __construct()
    {
        $this->existingProducts = Producto::query()
            ->pluck('nombre')
            ->map(fn($n) => mb_strtolower(trim($n)))
            ->toArray();
    }

    public function prepareUnidad(string $unidad)
    {
        return match (strtolower(trim($unidad))) {
            'pieza' => ProductoUnidadEnum::PIEZA->value,
            'PZA' => ProductoUnidadEnum::PIEZA->value,
            'par' => ProductoUnidadEnum::PAR->value,
            'metro' => ProductoUnidadEnum::METRO->value,
            default => ProductoUnidadEnum::PIEZA->value,
        };
    }

    public function model(array $row)
    {
        if (! in_array($this->categoria, [TipoProductoEnum::LUCES->value, TipoProductoEnum::MOTOS->value])) {
            Log::info('Categoria invalida', ['categoria' => $this->categoria]);
            $this->importInfo[] = [
                'status' => 'skiped',
                'message' => 'La categoria ' . $this->categoria . ' no es valida',
            ];

            return null;
        }
        $rowSubCategoria = isset($row[0]) && empty($row[1]) && empty($row[2]) && empty($row[3]) && empty($row[4]);
        $emptyRow = (empty($row[0]) || $row[0] == '') && empty($row[1]) && empty($row[2]) && empty($row[3]) && empty($row[4]);
        if ($emptyRow) {
            return null;
        }
        $categoria_id = Categoria::firstOrCreate(['nombre' => $this->categoria])->id;
        if ($rowSubCategoria) {
            $subcategoria = trim((string) $row[0]);
            $subcategoriaId = Subcategoria::firstOrCreate(['nombre' => $subcategoria, 'categoria_id' => $categoria_id])->id;
            $this->subcategoria[$subcategoria] = $subcategoriaId;

            return null;
        }

        $codigo = trim((string) ($row[0] ?? ''));
        if ($codigo === '') {
            $nombreParaFolio = isset($row[2]) ? trim((string) $row[2]) : 'PROD';
            $codigo = $this->generateUniqueFolio($nombreParaFolio);
        } else {
            $codigo = $codigo;
        }

        $cantidad = isset($row[1]) ? trim((string) $row[1]) : 0;
        $nombre = isset($row[2]) ? trim((string) $row[2]) : null;
        $marca = isset($row[3]) ? trim((string) $row[3]) : Marca::SIN_DEFINIR;
        $subcategoriaId = $this->subcategoria[$row[4]] ?? null;
        $precioVenta = isset($row[5]) ? preg_replace('/[^0-9.]/', '', $row[5]) : 0;

        $unidad = isset($row[6]) ?
            $this->prepareUnidad(trim((string) $row[6]))
            : ProductoUnidadEnum::PIEZA->value;
        // default values
        $proveedor_id = Proveedor::firstOrCreate(['nombre' => Proveedor::SIN_DEFINIR])->id;
        $precio_compra = 0;
        $precio_venta = $precioVenta;
        $stock = $cantidad;
        $cantidad_minima = 10;
        $compatibilidad = '';
        $ubicacion_id = Ubicacion::firstOrCreate(['nombre' => Ubicacion::DEFAULT_UBICACION])->id;
        $marca_id = Marca::firstOrCreate(['nombre' => $marca])->id;

        $key = mb_strtolower($nombre);
        if ($this->validateDuplicateProduct && in_array($key, $this->existingProducts, true)) {
            $this->duplicates[] = $nombre;
            Producto::where('nombre', $nombre)
                ->update([
                    'subcategoria_id' => $subcategoriaId,
                    'marca_id' => $marca_id,
                    'categoria_id' => $categoria_id,
                    'updated_at' => now(),
                ]);

            return null;
        }

        $imagenId = null;
        if (isset($row[4]) && str_contains($row[4], 'https://')) {
            $imagen = ImagenProducto::create([
                'archivo' => $row[4],
                'path' => '',
                'external' => true,
            ]);
            $imagenId = $imagen->id;
        }

        $currentRow = [
            'nombre' => $nombre,
            'proveedor_id' => $proveedor_id,
            'categoria_id' => $categoria_id,
            'subcategoria_id' => $subcategoriaId,
            'codigo' => $codigo,
            'precio_compra' => $precio_compra,
            'precio_venta' => $precio_venta,
            'stock' => floatval($stock),
            'cantidad_minima' => floatval($cantidad_minima),
            'compatibilidad' => $compatibilidad,
            'ubicacion_id' => $ubicacion_id,
            'marca_id' => $marca_id,
            'imagen_id' => $imagenId,
            'activo' => true,
            'unidad' => $unidad,
        ];

        if ($currentRow['nombre'] == '' || $currentRow['nombre'] == null || $currentRow['codigo'] == '') {
            Log::info('Row invalido', ['row' => $row, 'insertRow' => $currentRow]);

            return null;
        }

        if (strlen($codigo) > 18) {
            Log::info('Código de producto muy largo', ['codigo' => $codigo]);

            return null;
        }

        $producto = Producto::create($currentRow);
        $this->nuevoMovimiento([
            'producto_id' => $producto->id,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'motivo' => 'Importacion de producto',
            'cantidad' => $cantidad,
            'cantidad_anterior' => 0,
            'cantidad_actual' => $stock,
            'user_id' => auth()->user()->id,
        ]);

        $this->inserted[] = $nombre;
        $this->existingProducts[] = $nombre;

        return $producto;
    }

    public function getInserted(): array
    {
        return $this->inserted;
    }

    public function getImportInfo(): array
    {
        return $this->importInfo;
    }

    public function getDuplicates(): array
    {
        return $this->duplicates;
    }

    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => function (BeforeSheet $event) {
                $this->categoria = $event->getSheet()->getDelegate()->getTitle();
            },
        ];
    }

    private function generateUniqueFolio(string $nombre): string
    {
        $iniciales = collect(explode(' ', $nombre))
            ->map(fn($p) => Str::upper(Str::substr(preg_replace('/[^A-Za-z]/', '', Str::ascii($p)), 0, 1)))
            ->filter()
            ->implode('');

        $prefijo = Str::substr($iniciales ?: 'PRD', 0, 10);

        $random = Str::upper(Str::random(6));
        $codigo = "{$prefijo}-{$random}";

        return $codigo;
    }
}
