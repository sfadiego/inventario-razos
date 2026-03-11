<?php

use App\Http\Controllers\TipoMovimientoController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(TipoMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store')->middleware('can:admin');
        Route::prefix('{tipoMovimiento}')
            ->missing(function () {
                return Response::error('Tipo de movimiento no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update')->middleware('can:admin');
                Route::delete('', 'delete')->middleware('can:admin');
            });
    });
