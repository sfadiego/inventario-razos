<?php

namespace App\Enums;

enum TipoMovimientoEnum: string
{
    case ENTRADA = 'Entrada';
    case SALIDA = 'Salida';
    case REAJUSTE = 'Reajuste';
}
