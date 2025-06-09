<?php

use App\Http\Controllers\VentaProductoController;
use App\Http\Controllers\VentasController;
use Illuminate\Support\Facades\Route;

Route::controller(VentasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{id}')->group(function () {
            Route::get('productos', 'productoVenta');
        });
    });
