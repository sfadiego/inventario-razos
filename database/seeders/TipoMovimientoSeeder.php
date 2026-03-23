<?php

namespace Database\Seeders;

use App\Enums\TipoMovimientoEnum;
use App\Models\TipoMovimiento;
use Illuminate\Database\Seeder;

class TipoMovimientoSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'id' => 1,
                'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::ENTRADA->value),
            ],
            [
                'id' => 2,
                'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::SALIDA->value),
            ],
            [
                'id' => 3,
                'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::REAJUSTE->value),
            ],
            [
                'id' => 4,
                'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::DEVOLUCION->value),
            ],
            [
                'id' => 5,
                'nombre' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::CANCELANDO_DEVOLUCION->value),
            ],
        ];
        foreach ($data as $item) {
            TipoMovimiento::updateOrCreate(['nombre' => $item['nombre']], $item);
        }
    }
}
