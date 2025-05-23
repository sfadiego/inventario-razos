<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CategoriaSeeder::class,
        ]);

        Ubicacion::factory(4)->create();
        Cliente::factory(5)->create();
        Proveedor::factory(5)->create();
        Producto::factory(5)->create();
    }
}
