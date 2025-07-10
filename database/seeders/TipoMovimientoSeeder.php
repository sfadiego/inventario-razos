<?php

namespace Database\Seeders;

use App\Enums\TipoMovimientoEnum;
use App\Models\TipoMovimiento;
use Illuminate\Database\Seeder;

class TipoMovimientoSeeder extends Seeder
{
    public function run(): void
    {
        TipoMovimiento::create([
            'nombre' => TipoMovimientoEnum::ENTRADA->value,
        ]);

        TipoMovimiento::create([
            'nombre' => TipoMovimientoEnum::SALIDA->value,
        ]);

        TipoMovimiento::create([
            'nombre' => TipoMovimientoEnum::REAJUSTE->value,
        ]);
    }
}
