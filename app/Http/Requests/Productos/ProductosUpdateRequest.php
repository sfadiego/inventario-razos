<?php

namespace App\Http\Requests\Productos;

use Illuminate\Foundation\Http\FormRequest;

class ProductosUpdateRequest extends FormRequest
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
            'nombre' => ['nullable', 'string', 'max:255'],
            'proveedor_id' => ['nullable', 'exists:proveedores,id'],
            'categoria_id' => ['nullable', 'exists:categorias,id'],
            'codigo' => ['nullable', 'string'],
            'precio_compra' => ['nullable', 'numeric', 'min:1'],
            'precio_venta' => ['nullable', 'numeric', 'min:1'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'cantidad_minima' => ['nullable', 'integer', 'min:1'],
            'compatibilidad' => ['nullable', 'string', 'max:500'],
            'ubicacion_id' => ['nullable', 'exists:ubicaciones,id'],
            'activo' => ['nullable', 'boolean'],
            'unidad' => ['nullable', 'in:pieza,metro,par'],
            'file' => ['sometimes', 'file', 'mimes:jpeg,jpg,png', 'max:2048'],
        ];
    }
}
