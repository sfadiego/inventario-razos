<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'role' => RoleEnum::fromId(RoleEnum::Admin->value),
            ],
            [
                'role' => RoleEnum::fromId(RoleEnum::User->value),
            ],
            [
                'role' => RoleEnum::fromId(RoleEnum::SuperAdmin->value),
            ],
        ];
        foreach ($data as $item) {
            Role::updateOrCreate(['role' => $item['role']], $item);
        }
    }
}
