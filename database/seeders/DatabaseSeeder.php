<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategoriaSeeder::class,
            TipoMovimientoSeeder::class,
            MarcaSeeder::class,
            UbicacionSeeder::class,
            ProveedorSeeder::class,
        ]);
    }
}
