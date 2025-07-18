<?php

use App\Http\Controllers\TipoMovimientoController;
use Illuminate\Support\Facades\Route;

Route::controller(TipoMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{tipoMovimiento}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'delete');
        });
    });
