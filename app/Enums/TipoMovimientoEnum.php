<?php

namespace App\Enums;

enum TipoMovimientoEnum: int
{
    case ENTRADA = 1;
    case SALIDA = 2;
    case REAJUSTE = 3;
    case DEVOLUCION = 4;

    public function label(): string
    {
        return match ($this) {
            self::ENTRADA => 'Entrada',
            self::SALIDA => 'Salida',
            self::REAJUSTE => 'Reajuste',
            self::DEVOLUCION => 'Devolución'
        };
    }

    public static function fromId(int $id): ?string
    {
        $enum = match ($id) {
            self::ENTRADA->value => self::ENTRADA,
            self::SALIDA->value => self::SALIDA,
            self::REAJUSTE->value => self::REAJUSTE,
            self::DEVOLUCION->value => self::DEVOLUCION,
            default => null,
        };

        return $enum?->label();
    }
}
