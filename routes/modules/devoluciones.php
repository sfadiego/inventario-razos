<?php

use App\Http\Controllers\DevolucionesController;
use Illuminate\Support\Facades\Route;

Route::controller(DevolucionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('{devolucion}', 'show');
        Route::post('', 'store');
        Route::get('by-venta/{venta}', 'showByVenta');
    });
