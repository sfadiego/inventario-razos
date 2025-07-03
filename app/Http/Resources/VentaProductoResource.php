<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VentaProductoResource extends JsonResource
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
            'cantidad' => $this->cantidad,
            'precio' => $this->precio,
            'producto_id' => $this->producto_id,
            'producto' => $this->producto_id ? [
                'id' => $this->producto_id,
                'nombre' => $this->producto->nombre ?? null,
                'codigo' => $this->producto->codigo ?? null,
            ] : null,
            'venta_id' => $this->venta_id,
        ];
    }
}
