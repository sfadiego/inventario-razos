<?php

use App\Http\Controllers\PrinterController;
use Illuminate\Support\Facades\Route;

Route::controller(PrinterController::class)
    ->group(function () {
        Route::get('{venta}', 'print');
    });
