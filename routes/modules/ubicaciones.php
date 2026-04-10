<?php

use App\Http\Controllers\UbicacionesController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(UbicacionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store')->middleware('can:admin');
        Route::prefix('{ubicacion}')
            ->missing(function () {
                return Response::error('Ubicación no encontrada');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update')->middleware('can:admin');
                Route::delete('', 'delete')->middleware('can:admin');
            });
    });
