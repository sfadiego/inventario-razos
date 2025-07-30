<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Producto;
use App\Models\ProductoProveedor;
use App\Models\Proveedor;
use App\Models\ReporteMovimiento;
use App\Models\Ubicacion;
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
        ]);

        Ubicacion::factory(15)->create();
        Proveedor::factory(15)->create();
        Cliente::factory(15)->create();
        Producto::factory(15)->create();
        ProductoProveedor::factory(15)->create();
        ReporteMovimiento::factory(15)->create();
    }
}
