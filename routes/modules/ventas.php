<?php

use App\Http\Controllers\VentasController;
use Illuminate\Support\Facades\Route;

Route::controller(VentasController::class)
    ->group(function () {
        Route::post('', 'store');
    });
