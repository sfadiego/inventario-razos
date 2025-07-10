<?php

use App\Http\Controllers\VentasController;
use Illuminate\Support\Facades\Route;

Route::controller(VentasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::get('productos', 'productoVenta');
        Route::prefix('{venta}')->group(function () {
            Route::put('', 'update');
            Route::get('', 'show');
            Route::get('count-productos', 'countProductos');
        });
    });
