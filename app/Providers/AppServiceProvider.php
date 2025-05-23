<?php

namespace App\Providers;

use App\Http\Middleware\Response\ResponseMacros;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResponseMacros::register();
    }
}
