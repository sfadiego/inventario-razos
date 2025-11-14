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
                'role' => RoleEnum::Admin,
            ],
            [
                'role' => RoleEnum::User,
            ],
        ];
        Role::insert($data);
    }
}
