<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Diego Silva',
                'role_id' => RoleEnum::Admin->value,
                'email' => 'admin@repamotos.com',
                'password' => Hash::make('password'),
                'activo' => true,
            ],
            [
                'name' => 'Hugo Vargas',
                'role_id' => RoleEnum::User->value,
                'email' => 'empleado@repamostos.com',
                'password' => Hash::make('password'),
                'activo' => true,
            ],
        ];
        foreach ($data as $item) {
            User::updateOrCreate(['email' => $item['email']], $item);
        }
    }
}
