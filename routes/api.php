<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(base_path('/routes/modules/auth.php'));
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('dashboard')->group(base_path('/routes/modules/dashboard.php'));
    Route::prefix('users')->group(base_path('/routes/modules/users.php'));
    Route::prefix('categorias')->group(base_path('/routes/modules/categorias.php'));
    Route::prefix('subcategorias')->group(base_path('/routes/modules/subcategorias.php'));
    Route::prefix('clientes')->group(base_path('/routes/modules/clientes.php'));
    Route::prefix('productos')->group(base_path('/routes/modules/productos.php'));
    Route::prefix('imports')->group(base_path('/routes/modules/imports.php'));
    Route::prefix('images')->group(base_path('/routes/modules/images.php'));
    Route::prefix('proveedores')->group(base_path('/routes/modules/proveedores.php'));
    Route::prefix('ubicaciones')->group(base_path('/routes/modules/ubicaciones.php'));
    Route::prefix('venta-producto')->group(base_path('/routes/modules/ventaProducto.php'));
    Route::prefix('ventas')->group(base_path('/routes/modules/ventas.php'));
    Route::prefix('reporte-movimientos')->group(base_path('/routes/modules/reporteMovimientos.php'));
    Route::prefix('tipo-movimientos')->group(base_path('/routes/modules/tipoMovimientos.php'));
    Route::prefix('marcas')->group(base_path('/routes/modules/marcas.php'));
    Route::prefix('error-reporting')->group(base_path('/routes/modules/errorReporting.php'));
    Route::prefix('pdf')->group(base_path('/routes/modules/pdf.php'));
    Route::prefix('barcode')->group(base_path('/routes/modules/barcode.php'));
    Route::prefix('descargables')->group(base_path('/routes/modules/descargables.php'));

    Route::prefix('auth')->group(function () {
        Route::controller(AuthController::class)
            ->group(function () {
                Route::post('logout', 'logout');
            });
    });
});
