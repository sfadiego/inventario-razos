<?php

use App\Http\Controllers\MarcaController;
use Illuminate\Support\Facades\Route;

Route::controller(MarcaController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{marca}')
            ->missing(function () {
                return Response::error('Marca no encontrada');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
                Route::delete('', 'delete');
            });
    });
