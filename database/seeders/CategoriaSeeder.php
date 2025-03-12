<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        Categoria::create([
            'nombre' => 'Luces',
            'activa' => true,
        ]);
        
        Categoria::create([
            'nombre' => 'Refacciones',
            'activa' => true,
        ]);
    }
}
