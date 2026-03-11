<?php

use App\Http\Controllers\DevolucionesController;
use Illuminate\Support\Facades\Route;

Route::controller(DevolucionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('{venta}', 'show');
        Route::post('', 'store');
    });
