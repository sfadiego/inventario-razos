<?php

use App\Http\Controllers\ReporteMovimientoController;
use Illuminate\Support\Facades\Route;

Route::controller(ReporteMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{reporteMovimiento}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'delete');
        });
    });
