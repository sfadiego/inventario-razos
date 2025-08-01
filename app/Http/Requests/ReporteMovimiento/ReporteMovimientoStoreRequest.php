<?php

namespace App\Http\Requests\ReporteMovimiento;

use App\Enums\TipoMovimientoEnum;
use Illuminate\Foundation\Http\FormRequest;

class ReporteMovimientoStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $tipoMovimiento = TipoMovimientoEnum::REAJUSTE->value;

        return [
            'producto_id' => ['required', 'exists:productos,id'],
            'tipo_movimiento_id' => ['required', 'exists:tipo_movimientos,id'],
            'motivo' => ["required_if:tipo_movimiento_id,{$tipoMovimiento}", 'nullable'],
            'cantidad' => ['required', 'integer'],
        ];
    }

    public function messages()
    {
        return [
            'motivo.required_if' => 'El campo motivo es obligatorio cuando el tipo de movimiento es reajuste.',
        ];
    }
}
