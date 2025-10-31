<?php

use App\Http\Controllers\ReporteMovimientoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(ReporteMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{reporteMovimiento}')
            ->missing(function () {
                return Response::error('Reporte de movimiento no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
                Route::delete('', 'delete');
            });
    });
