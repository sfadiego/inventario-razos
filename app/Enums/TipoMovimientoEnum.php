<?php

namespace App\Enums;

use App\Models\TipoMovimiento;

enum TipoMovimientoEnum: string
{
    case ENTRADA = 'Entrada';
    case SALIDA = 'Salida';
    case REAJUSTE = 'Reajuste';

    public static function getMovimientoId(TipoMovimientoEnum $tipo): int
    {
        return TipoMovimiento::where('nombre', $tipo->value)->first()?->id;
    }
}
