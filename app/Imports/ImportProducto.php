<?php

namespace App\Imports;

use App\Models\Categoria;
use App\Models\ImagenProducto;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ImportProducto implements ToModel, WithStartRow
{
    public function startRow(): int
    {
        return 2;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {

        if (Producto::where('nombre', $row[0])->exists()) {
            Log::info("Producto duplicado: " . $row[0]);
            return null;
        }

        if (str_contains($row[8], 'https://')) {
            $imagen = ImagenProducto::create([
                'archivo' => $row[8],
                'path' => '',
                'external' => true,
            ]);
        }

        $currentRow = [
            'nombre' => $row[0],
            'unidad' => $row[1],
            'codigo' => Producto::createFolio($row[0]),
            'precio_compra' => $row[3],
            'precio_venta' => $row[4],
            'stock' => $row[5],
            'cantidad_minima' => $row[6],
            'compatibilidad' => $row[7],
            'activo' => true,
            'imagen_id' => $imagen->id,
            'proveedor_id' => Proveedor::firstOrCreate(['nombre' => $row[9]])->id,
            'categoria_id' =>  Categoria::firstOrCreate(['nombre' => $row[10]])->id,
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $row[11]])->id,
        ];

        return new Producto($currentRow);
    }
}
