<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Response;

Route::controller(UserController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{user}')
            ->missing(function () {
                return Response::error('Usuario no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
                Route::delete('', 'delete');
            });
    });
