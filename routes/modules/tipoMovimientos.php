<?php

use App\Http\Controllers\TipoMovimientoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(TipoMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{tipoMovimiento}')
            ->missing(function () {
                return Response::error('Tipo de movimiento no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
                Route::delete('', 'delete');
            });
    });
