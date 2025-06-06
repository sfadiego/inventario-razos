<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VentasResource extends JsonResource
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
            'venta_total' => $this->venta_total,
            'nombre_venta' => $this->nombre_venta,
            'cliente_id' => $this->cliente_id,
            'cliente' => $this->cliente ? $this->cliente : null,
            'tipo_compra' => $this->tipo_compra,
        ];
    }
}
