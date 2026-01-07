<?php

namespace App\Http\Requests\Pdf;

use Illuminate\Foundation\Http\FormRequest;

class CatalogoProductosRequest extends FormRequest
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
            'categoria_id' => ['required', 'integer', 'exists:categorias,id'],
            'print_barcode' => ['nullable', 'boolean'],
            'print_image' => ['nullable', 'boolean'],
        ];
    }
}
