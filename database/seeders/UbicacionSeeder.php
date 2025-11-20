<?php

namespace Database\Seeders;

use App\Models\Ubicacion;
use Illuminate\Database\Seeder;

class UbicacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ubicacion::updateOrCreate([
            'nombre' => Ubicacion::DEFAULT_UBICACION,
        ]);
    }
}
