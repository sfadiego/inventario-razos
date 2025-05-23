<?php

use App\Http\Controllers\ClientesController;
use Illuminate\Support\Facades\Route;

Route::controller(ClientesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{categoria}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'destroy');
        });
    });
