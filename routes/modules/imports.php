<?php

use App\Http\Controllers\ImportProductsController;
use Illuminate\Support\Facades\Route;

Route::controller(ImportProductsController::class)
    ->group(function () {
        Route::post('', 'store');
    });
