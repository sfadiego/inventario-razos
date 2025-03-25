<?php

namespace App\Http\Requests\Productos;

use Illuminate\Foundation\Http\FormRequest;

class ProductosStoreRequest extends FormRequest
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
            'nombre' => ['required', 'string', 'max:255'],
            'proveedor_id' => ['required', 'exists:proveedores,id'],
            'categoria_id' => ['required', 'exists:categorias,id'],
            'codigo' => ['required', 'string', 'unique:productos,codigo', 'max:100'],
            'precio_compra' => ['required', 'numeric', 'min:0'],
            'precio_venta' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'cantidad_minima' => ['required', 'integer', 'min:0'],
            'compatibilidad' => ['nullable', 'string', 'max:500'],
            'ubicacion_id' => ['required', 'exists:ubicaciones,id'],
            'activo' => ['nullable', 'boolean'],
        ];
    }
}
