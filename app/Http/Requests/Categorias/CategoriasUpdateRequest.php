<?php

namespace App\Http\Requests\Categorias;

use Illuminate\Foundation\Http\FormRequest;

class CategoriasUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255', 'unique:categorias,nombre,' . $this->route('categoria')],
            'activa' => ['boolean'],
        ];
    }
}
