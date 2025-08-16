<?php

namespace App\Traits;

use App\Models\ReporteMovimiento;

trait Movimientos
{
    public function nuevoMovimiento(array $data): ReporteMovimiento|false
    {
        $clavesPermitidas = [
            'producto_id',
            'tipo_movimiento_id',
            'motivo',
            'cantidad',
            'cantidad_anterior',
            'cantidad_actual',
            'user_id',
        ];

        if (collect($data)->keys()->count() !== collect($clavesPermitidas)->keys()->count()) {
            return false;
        }

        return ReporteMovimiento::create([
            'producto_id' => $data['producto_id'],
            'tipo_movimiento_id' => $data['tipo_movimiento_id'],
            'motivo' => $data['motivo'],
            'cantidad' => $data['cantidad'],
            'cantidad_anterior' => $data['cantidad_anterior'],
            'cantidad_actual' => $data['cantidad_actual'],
            'user_id' => $data['user_id'],
            'created_at' => now()
        ]);
    }
}
