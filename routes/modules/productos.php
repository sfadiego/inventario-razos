<?php

use App\Http\Controllers\ProductosController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(ProductosController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::get('pdf/print', 'printCatalog');
        Route::prefix('{producto}')
            ->missing(function () {
                return Response::error('Producto no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::post('', 'update');
                Route::delete('', 'delete');
            });
    });
