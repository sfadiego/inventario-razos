<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{user}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'delete');
        });
    });