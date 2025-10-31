<?php

use App\Http\Controllers\VentasController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(VentasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::get('productos', 'productoVenta');
        Route::prefix('{venta}')
            ->missing(function () {
                return Response::error('Venta no encontrada');
            })
            ->group(function () {
                Route::put('', 'update');
                Route::get('', 'show');
                Route::put('finalizar-venta', 'finalizarVenta');
                Route::get('count-productos', 'countProductos');
            });
    });
