<?php

use App\Http\Controllers\BarcodeGeneratorController;
use Illuminate\Support\Facades\Route;

Route::controller(BarcodeGeneratorController::class)
    ->group(function () {
        Route::get('generate/{producto}', 'generateBarcode');
    });
