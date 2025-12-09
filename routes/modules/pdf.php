<?php

use App\Http\Controllers\PdfGeneratorController;
use Illuminate\Support\Facades\Route;

Route::controller(PdfGeneratorController::class)
    ->group(function () {
        Route::get('catalogo-productos', 'catalogoProductos');
        Route::get('reporte-ventas', 'reporteVentas');
    });
