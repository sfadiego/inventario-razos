<?php

use App\Http\Controllers\ImagesController;
use Illuminate\Support\Facades\Route;


Route::controller(ImagesController::class)
    ->group(function () {
        Route::get('{folder}/{image}', 'show');
    });
