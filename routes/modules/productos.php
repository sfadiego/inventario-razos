<?php

use App\Http\Controllers\ProductosController;
use Illuminate\Support\Facades\Route;

Route::controller(ProductosController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{producto}')->group(function () {
            Route::get('', 'show');
            Route::post('', 'update');
            Route::delete('', 'destroy');
        });
    });
