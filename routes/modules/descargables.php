<?php

use App\Http\Controllers\DescargablesController;
use Illuminate\Support\Facades\Route;

Route::controller(DescargablesController::class)
    ->group(function () {
        Route::get('template', 'downloadTemplateImport');
    });
