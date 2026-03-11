<?php

namespace App\Providers;

use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::define('user', function ($user) {
            return $user->role_id === RoleEnum::User;
        });

        Gate::define('admin', function ($user) {
            return in_array($user->role_id, [RoleEnum::SuperAdmin, RoleEnum::Admin]);
        });
    }
}
