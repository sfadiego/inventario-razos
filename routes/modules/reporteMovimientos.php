<?php 

use App\Http\Controllers\ReporteMovimientoController;
use Illuminate\Support\Facades\Route;

Route::controller(ReporteMovimientoController::class)
    ->group(function () {
        Route::get('', 'index');
    });