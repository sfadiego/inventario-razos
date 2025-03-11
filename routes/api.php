<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->group(function () {
    Route::controller(AuthController::class)
        ->group(function () {
            Route::get('test', 'index');
        });
});
