<?php

use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\SubcategoriasController;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

Route::controller(CategoriasController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::post('', 'store');
        Route::prefix('{categoria}')
            ->missing(function () {
                return Response::error('Categoria no encontrada');
            })
            ->group(function () {
                Route::get('', 'show');
                Route::put('', 'update');
                Route::delete('', 'delete');

                Route::controller(SubcategoriasController::class)
                    ->group(function () {
                        Route::get('subcategorias', 'index');
                        Route::get('subcategorias/{subcategoria}', 'show')
                            ->missing(function () {
                                return Response::error('Subcategoria no encontrada');
                            });
                    });
            });
    });
