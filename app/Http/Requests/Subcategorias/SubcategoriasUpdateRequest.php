<?php

namespace App\Http\Requests\Subcategorias;

use Illuminate\Foundation\Http\FormRequest;

class SubcategoriasUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'max:255', 'unique:subcategoria,nombre'],
            'categoria_id' => ['required', 'exists:categorias,id'],
        ];
    }
}
