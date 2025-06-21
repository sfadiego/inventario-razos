<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'unique:users,name', 'max:255'],
            'role_id' => ['required', 'exists:roles,id'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'activo' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.unique' => 'El nombre ya existe en la base de datos.',
            'role_id.required' => 'El rol es obligatorio.',
            'email.required' => 'El email es obligatorio.',
            'email.unique' => 'El email ya existe en la base de datos.',
            'password.required' => 'La contraseña es obligatoria.',
        ];
    }
}
