<?php

namespace Tests;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;

abstract class TestCase extends BaseTestCase
{
    use DatabaseTransactions,  WithFaker;

    public static bool $migrated = false;

    protected function setUp(): void
    {
        parent::setUp();
        if (! self::$migrated) {
            self::runFreshMigrations();
            self::$migrated = true;
        }
        // ErrorContainer::resetErrors();
        $this->withoutVite();
        $this->withoutExceptionHandling();
    }

    public function runFreshMigrations(): void
    {
        $this->artisan('migrate:fresh');
        $this->artisan('db:seed');
    }

    public function loginAdmin(): User
    {
        return $this->createUser(RoleEnum::Admin);
    }

    public function createUser(RoleEnum $role): User
    {
        $roleKey = strtolower($role->value);
        $user = User::factory()->create(['role_id' => $role->value]);
        Sanctum::actingAs($user);
        // implementa permisos por roles
        // Authxolote::actionsFake(array_values(config("actions.roles.$roleKey")));

        return $user;
    }
}
