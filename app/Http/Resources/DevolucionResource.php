<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DevolucionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "venta_total" => $this->venta_total,
            "nombre_venta" => $this->nombre_venta,
            "folio" => $this->folio,
            "cliente_id" => $this->cliente_id,
            "tipo_compra" => $this->tipo_compra,
            "status_venta" => $this->status_venta,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "deleted_at" => $this->deleted_at,
            "cliente" => $this->cliente_id ? [
                "id" => $this->cliente->id,
                "nombre" => $this->cliente->nombre,
                "confiable" => $this->cliente->confiable,
                "observaciones" => $this->cliente->observaciones,
                "adeudo" => $this->cliente->adeudo,
                "created_at" => $this->cliente->created_at,
                "updated_at" => $this->cliente->updated_at
            ] : null,
            "tieneDevolucion" => $this->devolucion !== null ? true : false
        ];
    }
}
