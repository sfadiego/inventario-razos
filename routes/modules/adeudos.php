<?php

use App\Http\Controllers\AdeudosController;
use Illuminate\Support\Facades\Route;

Route::controller(AdeudosController::class)
    ->group(function () {
        Route::put('{cliente}/liquidar-todos', 'liquidarAdeudos')->middleware('can:admin');
        Route::put('{adeudo}/liquidar', 'update')->middleware('can:admin');
    });
