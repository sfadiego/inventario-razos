<?php

use App\Http\Controllers\DevolucionesController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(DevolucionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::get('by-venta/{venta}', 'showByVenta');
        Route::prefix('{devolucion}')
            ->missing(function () {
                return Response::error('Devolución no encontrada');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
            });
    });
