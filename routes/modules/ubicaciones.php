<?php

use App\Http\Controllers\UbicacionesController;
use Illuminate\Support\Facades\Route;

Route::controller(UbicacionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{id}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'destroy');
        });
    });
