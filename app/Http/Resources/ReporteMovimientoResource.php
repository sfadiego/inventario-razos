<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReporteMovimientoResource extends JsonResource
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
            'producto_id' => $this->producto_id,
            'producto' => $this->producto_id ? [
                'id' => $this->producto_id,
                'nombre' => $this->producto->nombre ?? null,
                'codigo' => $this->producto->codigo ?? null,
                'stock' => $this->producto->stock ?? 0,
            ] : null,
            'tipo_movimiento_id' => $this->tipo_movimiento_id,
            'tipo_movimiento' => $this->tipo_movimiento_id ? [
                'id' => $this->tipoMovimiento->id,
                'nombre' => $this->tipoMovimiento->nombre,
            ] : null,
            'motivo' => $this->motivo,
            'cantidad' => $this->cantidad,
            'cantidad_anterior' => $this->cantidad_anterior,
            'cantidad_actual' => $this->cantidad_actual,
            'user_id' => $this->user_id,
            'user' => $this->user_id ? $this->user : null,
            'fecha_movimiento' => $this->fecha_movimiento,
        ];
    }
}
