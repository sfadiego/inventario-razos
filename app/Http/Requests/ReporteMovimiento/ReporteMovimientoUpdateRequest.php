<?php

namespace App\Http\Requests\ReporteMovimiento;

use Illuminate\Foundation\Http\FormRequest;

class ReporteMovimientoUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'producto_id' => ['required', 'exists:productos,id'],
            'tipo_movimiento_id' => ['required', 'exists:tipo_movimientos,id'],
            'motivo' => 'nullable',
            'cantidad' => ['required', 'integer', 'min:0'],
            'cantidad_anterior' => ['required', 'integer', 'min:0'],
            'cantidad_actual' => ['required', 'integer', 'min:0'],
            'user_id' => ['required', 'exists:users,id'],
            'fecha_movimiento' => ['required'],
        ];
    }
}
