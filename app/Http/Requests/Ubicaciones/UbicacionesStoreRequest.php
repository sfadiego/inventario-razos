<?php

namespace App\Http\Requests\Ubicaciones;

use Illuminate\Foundation\Http\FormRequest;

class UbicacionesStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'unique:ubicaciones,nombre', 'string', 'max:255'],
        ];
    }
}
