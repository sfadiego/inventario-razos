<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Diego Silva',
            'email' => 'admin@administrador.com',
            'password' => Hash::make('password'),
            'activo' => true,
        ]);

         User::create([
            'name' => 'Hugo Vargas',
            'email' => 'empleado@empleado.com',
            'password' => Hash::make('password'),
            'activo' => true,
        ]);
    }
}
