<?php

namespace App\Imports;

use App\Enums\ProductoUnidadEnum;
use App\Models\Categoria;
use App\Models\ImagenProducto;
use App\Models\Marca;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ImportProducto implements ToModel, WithCalculatedFormulas, WithStartRow
{
    public array $inserted = [];

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
            ->map(fn ($n) => mb_strtolower(trim($n)))
            ->toArray();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model2(array $row)
    {
        // $codigo = isset($row[0]) ? trim((string) $row[0]) : Producto::createFolio($row[2]);
        // $cantidad = isset($row[1]) ? trim((string) $row[1]) : 0;
        // $nombreProducto = isset($row[2]) ? trim((string) $row[2]) : null;
        // $marca = isset($row[3]) ? trim((string) $row[3]) : null;

        // if (! ProductoUnidadEnum::tryFrom($unidad)) {
        //     $this->errors[] = [
        //         'row' => $row,
        //         'reason' => 'unidad inválida',
        //     ];

        //     return null;
        // }

        // $codigo = Producto::createFolio($nombre);
        // $precio_compra = isset($row[3]) ? trim($row[3]) : null;
        // $precio_venta = isset($row[4]) ? trim($row[4]) : null;
        // $stock = isset($row[5]) ? trim($row[5]) : null;
        // $cantidad_minima = isset($row[6]) ? trim($row[6]) : null;
        // $compatibilidad = isset($row[7]) ? trim($row[7]) : null;
        // $proveedor = isset($row[9]) ? trim($row[9]) : null;
        // $categoria = isset($row[10]) ? trim($row[10]) : null;
        // $ubicacion = isset($row[11]) ? trim($row[11]) : null;
        // $marca = isset($row[12]) ? trim($row[12]) : null;

        // if (empty($nombre)) {
        //     $this->duplicates[] = [
        //         'row' => $row,
        //         'reason' => 'nombre vacío',
        //     ];

        //     return null;
        // }

        // $key = mb_strtolower($nombre);
        // if (in_array($key, $this->existingProducts, true)) {
        //     $this->duplicates[] = ['nombre' => $nombre];

        //     return null;
        // }

        // $imagenId = null;
        // if (str_contains($row[8], 'https://')) {
        //     $imagen = ImagenProducto::create([
        //         'archivo' => $row[8],
        //         'path' => '',
        //         'external' => true,
        //     ]);
        //     $imagenId = $imagen->id;
        // }

        // $currentRow = [
        //     'nombre' => $nombre,
        //     'unidad' => $unidad,
        //     'codigo' => $codigo,
        //     'precio_compra' => $precio_compra,
        //     'precio_venta' => $precio_venta,
        //     'stock' => $stock,
        //     'cantidad_minima' => $cantidad_minima,
        //     'compatibilidad' => $compatibilidad,
        //     'activo' => true,
        //     'imagen_id' => $imagenId,
        //     'proveedor_id' => Proveedor::firstOrCreate(['nombre' => $proveedor])->id,
        //     'categoria_id' => Categoria::firstOrCreate(['nombre' => $categoria])->id,
        //     'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $ubicacion])->id,
        //     'marca_id' => Marca::firstOrCreate(['nombre' => $marca])->id,
        // ];

        // $this->inserted[] = $nombre;

        // return new Producto($currentRow);
    }

    public function model(array $row)
    {
        $nombre = isset($row[0]) ? trim((string) $row[0]) : null;
        $unidad = isset($row[1]) ? trim($row[1]) : null;
        if (! ProductoUnidadEnum::tryFrom($unidad)) {
            $this->errors[] = [
                'row' => $row,
                'reason' => 'unidad inválida',
            ];

            return null;
        }

        $codigo = Producto::createFolio($nombre);
        $precio_compra = isset($row[3]) ? trim($row[3]) : null;
        $precio_venta = isset($row[4]) ? trim($row[4]) : null;
        $stock = isset($row[5]) ? trim($row[5]) : null;
        $cantidad_minima = isset($row[6]) ? trim($row[6]) : null;
        $compatibilidad = isset($row[7]) ? trim($row[7]) : null;
        $proveedor = isset($row[9]) ? trim($row[9]) : null;
        $categoria = isset($row[10]) ? trim($row[10]) : null;
        $ubicacion = isset($row[11]) ? trim($row[11]) : null;
        $marca = isset($row[12]) ? trim($row[12]) : null;

        if (empty($nombre)) {
            $this->duplicates[] = [
                'row' => $row,
                'reason' => 'nombre vacío',
            ];

            return null;
        }

        $key = mb_strtolower($nombre);
        if (in_array($key, $this->existingProducts, true)) {
            $this->duplicates[] = ['nombre' => $nombre];

            return null;
        }

        $imagenId = null;
        if (str_contains($row[8], 'https://')) {
            $imagen = ImagenProducto::create([
                'archivo' => $row[8],
                'path' => '',
                'external' => true,
            ]);
            $imagenId = $imagen->id;
        }

        $currentRow = [
            'nombre' => $nombre,
            'unidad' => $unidad,
            'codigo' => $codigo,
            'precio_compra' => $precio_compra,
            'precio_venta' => $precio_venta,
            'stock' => $stock,
            'cantidad_minima' => $cantidad_minima,
            'compatibilidad' => $compatibilidad,
            'activo' => true,
            'imagen_id' => $imagenId,
            'proveedor_id' => Proveedor::firstOrCreate(['nombre' => $proveedor])->id,
            'categoria_id' => Categoria::firstOrCreate(['nombre' => $categoria])->id,
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $ubicacion])->id,
            'marca_id' => Marca::firstOrCreate(['nombre' => $marca])->id,
        ];

        $this->inserted[] = $nombre;

        return new Producto($currentRow);
    }

    public function getInserted(): array
    {
        return $this->inserted;
    }

    public function getDuplicates(): array
    {
        return $this->duplicates;
    }
}
