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
            'id' => 1,
            'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::ENTRADA->value),
        ]);

        TipoMovimiento::create([
            'id' => 2,
            'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::SALIDA->value),
        ]);

        TipoMovimiento::create([
            'id' => 3,
            'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::REAJUSTE->value),
        ]);
    }
}
