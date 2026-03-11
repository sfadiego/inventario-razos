<?php

namespace App\Enums;

enum RoleEnum: int
{
    case Admin = 1;
    case User = 2;
    case SuperAdmin = 3;

    public function label(): string
    {
        return match ($this) {
            self::Admin => 'Administrador',
            self::User => 'Usuario',
            self::SuperAdmin => 'Super Admin',
        };
    }

    public static function fromId(int $id): ?string
    {
        $enum = match ($id) {
            self::Admin->value => self::Admin,
            self::User->value => self::User,
            self::SuperAdmin->value => self::SuperAdmin,
            default => null,
        };

        return $enum?->label();
    }
}
