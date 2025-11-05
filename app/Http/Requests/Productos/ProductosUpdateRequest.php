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
            'marca_id' => ['nullable', 'exists:marcas,id'],
            'file' => ['sometimes', 'file', 'mimes:jpeg,jpg,png', 'max:2048'],
        ];
    }

    /**
     * mensajes personalizados
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.unique' => 'El nombre ya existe en la base de datos.',
            'proveedor_id.required' => 'El proveedor es obligatorio.',
            'categoria_id.required' => 'La categoria es obligatoria.',
            'codigo.unique' => 'El codigo ya existe en la base de datos.',
            'precio_compra.required' => 'El precio de compra es obligatorio.',
            'precio_venta.required' => 'El precio de venta es obligatorio.',
            'stock.required' => 'El stock es obligatorio.',
            'cantidad_minima.required' => 'La cantidad minima es obligatoria.',
            'compatibilidad.required' => 'La compatibilidad es obligatoria.',
            'ubicacion_id.required' => 'La ubicacion es obligatoria.',
            'unidad.required' => 'La unidad es obligatoria.',
            'activo.required' => 'El activo es obligatorio.',
            'marca_id.required' => 'La marca es obligatoria.',
        ];
    }
}
