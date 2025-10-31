<?php

use App\Http\Controllers\VentaProductoController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(VentaProductoController::class)
    ->group(function () {
        Route::post('', 'store');
        Route::prefix('{ventaProducto}')
            ->missing(function () {
                return Response::error('Venta de producto no encontrada');
            })
            ->group(function () {
                Route::put('', 'update');
                Route::delete('', 'delete');
            });
    });
