<?php

use App\Http\Controllers\CategoriasController;
use Illuminate\Support\Facades\Route;


// TODO: revisar middleware para peticiones a la api
// Route::middleware('auth:sanctum')->group(function () {
// });
Route::prefix('admin')
  ->group(function () {
    Route::prefix('categorias')->group(base_path('/routes/modules/categorias.php'));
  });
