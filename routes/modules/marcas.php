<?php

use App\Http\Controllers\MarcaController;
use Illuminate\Support\Facades\Route;

Route::controller(MarcaController::class)
    ->group(function () {
        Route::get('', 'index');
    });
