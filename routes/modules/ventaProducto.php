<?php

use App\Http\Controllers\VentaProductoController;
use Illuminate\Support\Facades\Route;

Route::controller(VentaProductoController::class)
    ->group(function () {
        Route::prefix('{ventaProducto}')->group(function () {
            Route::delete('', 'delete');
        });
    });
