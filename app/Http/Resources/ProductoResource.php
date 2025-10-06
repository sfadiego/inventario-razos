<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'proveedor_id' => $this->proveedor_id,
            'proveedor' => $this->proveedor ? $this->proveedor : null,
            'categoria_id' => $this->categoria_id,
            'categoria' => $this->categoria ? $this->categoria : null,
            'codigo' => $this->codigo,
            'precio_compra' => $this->precio_compra,
            'precio_venta' => $this->precio_venta,
            'stock' => $this->stock,
            'cantidad_minima' => $this->cantidad_minima,
            'compatibilidad' => $this->compatibilidad,
            'ubicacion_id' => $this->ubicacion_id,
            'ubicacion' => $this->ubicacion ? $this->ubicacion : null,
            'activo' => $this->activo,
            'imagen_id' => $this->imagen_id,
            'imagen' => $this->imagen ? $this->imagen : null,
            'unidad' => $this->unidad,
        ];
    }
}
