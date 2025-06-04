<?php

namespace App\Http\Requests\VentaProducto;

use Illuminate\Foundation\Http\FormRequest;

class VentaProductoStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cantidad' => ['required', 'numeric'],
            'precio' => ['required', 'numeric'],
            'producto_id' => ['required', 'exists:productos,id'],
            'venta_id' => ['required', 'exists:venta,id'],
        ];
    }
}
