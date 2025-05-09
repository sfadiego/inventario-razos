<?php

use App\Http\Controllers\Admin\CategoriasController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('admin')->group(function () {
        Route::get('categorias', [CategoriasController::class, 'index'])
            ->name('admin.categorias');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
