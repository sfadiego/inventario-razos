<?php

use App\Http\Controllers\CategoriasController;
use Illuminate\Support\Facades\Route;

Route::controller(CategoriasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{categoria}')->group(function () {
            Route::get('', 'show');
            Route::put('', 'update');
            Route::delete('', 'destroy');
        });
    });
