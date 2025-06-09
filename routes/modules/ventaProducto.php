<?php

use App\Http\Controllers\VentaProductoController;
use Illuminate\Support\Facades\Route;

Route::controller(VentaProductoController::class)
    ->group(function () {
        Route::post('', 'store');
        Route::prefix('{id}')->group(function () {
            Route::delete('', 'delete');
        });
    });
