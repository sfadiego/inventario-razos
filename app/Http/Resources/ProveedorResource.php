<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProveedorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'nombre' => $this->nombre,
            'empresa' => $this->empresa,
            'observaciones' => $this->observaciones,
            'categoria' => $this->categorias ? collect($this->categorias)
                ->map(function ($item) {
                    return [
                        "id" => $item->id,
                        "nombre" => $item->nombre
                    ];
                }) : null,
            'created_at' => $this->created_at
        ];
    }
}
