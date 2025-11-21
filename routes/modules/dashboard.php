<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::controller(DashboardController::class)
    ->group(function () {
        Route::get('total-ventas', 'totalVentas');
        Route::get('mas-vendidos', 'masVendidos');
        Route::get('menos-vendidos', 'menosVendidos');
        Route::get('ventas', 'ventas');
    });
