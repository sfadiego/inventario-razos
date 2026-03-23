<?php

namespace App\Enums;

enum TipoMovimientoEnum: int
{
    case ENTRADA = 1;
    case SALIDA = 2;
    case REAJUSTE = 3;
    case DEVOLUCION = 4;
    case CANCELANDO_DEVOLUCION = 5;

    public function label(): string
    {
        return match ($this) {
            self::ENTRADA => 'Entrada',
            self::SALIDA => 'Salida',
            self::REAJUSTE => 'Reajuste',
            self::DEVOLUCION => 'Devolución',
            self::CANCELANDO_DEVOLUCION => 'Cancelando devolución',
        };
    }

    public static function fromId(int $id): ?string
    {
        $enum = match ($id) {
            self::ENTRADA->value => self::ENTRADA,
            self::SALIDA->value => self::SALIDA,
            self::REAJUSTE->value => self::REAJUSTE,
            self::DEVOLUCION->value => self::DEVOLUCION,
            self::CANCELANDO_DEVOLUCION->value => self::CANCELANDO_DEVOLUCION,
            default => null,
        };

        return $enum?->label();
    }
}
