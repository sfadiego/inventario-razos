<?php

namespace App\Http\Requests\Subcategorias;

use Illuminate\Foundation\Http\FormRequest;

class SubcategoriasStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => ['required', 'string', 'unique:subcategoria,nombre', 'max:255'],
            'categoria_id' => ['required', 'exists:categorias,id'],
        ];
    }
}
