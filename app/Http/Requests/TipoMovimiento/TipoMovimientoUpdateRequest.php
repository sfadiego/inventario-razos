<?php

namespace App\Http\Requests\TipoMovimiento;

use Illuminate\Foundation\Http\FormRequest;

class TipoMovimientoUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'unique:tipo_movimientos,nombre', 'string', 'max:255'],
        ];
    }
}
