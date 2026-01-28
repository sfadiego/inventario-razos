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
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Events\BeforeSheet;

class ImportProducto implements ToModel, WithCalculatedFormulas, WithEvents, WithStartRow
{
    use Movimientos;

    public array $inserted = [];

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
        $emptyRow = empty($row[0]) && empty($row[1]) && empty($row[2]) && empty($row[3]) && empty($row[4]);
        if ($emptyRow) {
            Log::info('Celda vacia', ['row' => $row]);

            return null;
        }
        $categoria_id = Categoria::firstOrCreate(['nombre' => $this->categoria])->id;
        if ($rowSubCategoria) {
            $subcategoria = trim((string) $row[0]);
            $subcategoriaId = Subcategoria::firstOrCreate(['nombre' => $subcategoria, 'categoria_id' => $categoria_id])->id;
            $this->subcategoria[$subcategoria] = $subcategoriaId;

            return null;
        }

        $availableCodigo = Producto::where(['codigo' => $row[0]])->count();
        $codigo = ! $availableCodigo ? Producto::createFolio(trim((string) $row[2])) : trim((string) $row[0]);
        $cantidad = isset($row[1]) ? trim((string) $row[1]) : 0;
        $nombre = isset($row[2]) ? trim((string) $row[2]) : null;
        $marca = isset($row[3]) ? trim((string) $row[3]) : Marca::SIN_DEFINIR;
        $subcategoriaId = $this->subcategoria[$row[4]] ?? null;
        // default values
        $proveedor_id = Proveedor::firstOrCreate(['nombre' => Proveedor::SIN_DEFINIR])->id;
        $precio_compra = 0;
        $precio_venta = 0;
        $stock = $cantidad;
        $cantidad_minima = 10;
        $compatibilidad = '';
        $ubicacion_id = Ubicacion::firstOrCreate(['nombre' => Ubicacion::DEFAULT_UBICACION])->id;
        $marca_id = Marca::firstOrCreate(['nombre' => $marca])->id;
        $unidad = ProductoUnidadEnum::PIEZA->value;

        $key = mb_strtolower($nombre);
        if (in_array($key, $this->existingProducts, true)) {
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
            'stock' => intval($stock),
            'cantidad_minima' => intval($cantidad_minima),
            'compatibilidad' => $compatibilidad,
            'ubicacion_id' => $ubicacion_id,
            'marca_id' => $marca_id,
            'imagen_id' => $imagenId,
            'activo' => true,
            'unidad' => $unidad,
        ];
        $this->inserted[] = $nombre;
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
}
