<?php

use App\Http\Controllers\SubcategoriasController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(SubcategoriasController::class)
    ->group(function () {

        Route::prefix('{subcategoria}')
            ->missing(function () {
                return Response::error('Subcategoria no encontrada');
            })
            ->group(function () {
                Route::put('', 'update');
                Route::post('subcategorias', 'store');
                Route::delete('', 'delete');
            });
    });
