<?php

use App\Http\Controllers\UbicacionesController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(UbicacionesController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{ubicacion}')
            ->missing(function () {
                return Response::error('Ubicacion no encontrada');
            })
            ->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'destroy');
        });
    });
