<?php

use App\Http\Controllers\CategoriasController;
use Illuminate\Support\Facades\Route;


// TODO: revisar middleware para peticiones a la api
// Route::middleware('auth:sanctum')->group(function () {
// });
Route::prefix('admin')
    ->group(function () {
        Route::prefix('categorias')->group(function () {
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
        });
    });
