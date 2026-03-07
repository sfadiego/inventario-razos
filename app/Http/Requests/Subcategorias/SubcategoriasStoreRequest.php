<?php

namespace App\Http\Requests\Subcategorias;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubcategoriasStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => [
                'required',
                'string',
                'max:255',
                Rule::unique('subcategoria', 'nombre')
                    ->where(fn($query) => $query->where('categoria_id', $this->categoria_id))
            ],
            'categoria_id' => ['required', 'exists:categorias,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
        ];
    }
}
