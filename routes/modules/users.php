<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(UserController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store')->middleware('can:admin');
        Route::prefix('{user}')
            ->missing(function () {
                return Response::error('Usuario no encontrado');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update')->middleware('can:admin');
                Route::delete('', 'delete')->middleware('can:admin');
            });
    });
