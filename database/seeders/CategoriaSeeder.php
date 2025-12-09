<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nombre' => 'Luces',
                'activa' => true,
            ],
            [
                'nombre' => 'Motocicletas',
                'activa' => true,
            ]
        ];
        foreach ($data as $item) {
            Categoria::updateOrCreate(['nombre' => $item['nombre']], $item);
        }
    }
}
