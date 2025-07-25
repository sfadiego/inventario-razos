<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(base_path('/routes/modules/auth.php'));
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('users')->group(base_path('/routes/modules/users.php'));
    Route::prefix('categorias')->group(base_path('/routes/modules/categorias.php'));
    Route::prefix('clientes')->group(base_path('/routes/modules/clientes.php'));
    Route::prefix('productos')->group(base_path('/routes/modules/productos.php'));
    Route::prefix('proveedores')->group(base_path('/routes/modules/proveedores.php'));
    Route::prefix('ubicaciones')->group(base_path('/routes/modules/ubicaciones.php'));
    Route::prefix('venta-producto')->group(base_path('/routes/modules/ventaProducto.php'));
    Route::prefix('ventas')->group(base_path('/routes/modules/ventas.php'));
    Route::prefix('reporte-movimientos')->group(base_path('/routes/modules/reporteMovimientos.php'));
    Route::prefix('tipo-movimientos')->group(base_path('/routes/modules/tipoMovimientos.php'));
});
