<?php

use App\Http\Controllers\VentasController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(VentasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::get('productos', 'productoVenta');
        Route::get('reporte', 'reporteVentas');
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
