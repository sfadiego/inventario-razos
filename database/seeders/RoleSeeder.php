<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create([
            'role' => RoleEnum::Admin,
        ]);

        Role::create([
            'role' => RoleEnum::User,
        ]);
    }
}
