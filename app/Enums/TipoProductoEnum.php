<?php

namespace App\Enums;

enum TipoProductoEnum: string
{
    case MOTOS = 'Motocicletas';
    case LUCES = 'Luces';

    public function label(): string
    {
        return match ($this) {
            self::MOTOS => 'Motocicletas',
            self::LUCES => 'Luces',
        };
    }
}
