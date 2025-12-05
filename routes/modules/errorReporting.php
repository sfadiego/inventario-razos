<?php

use App\Http\Controllers\ErrorReportingController;
use Illuminate\Support\Facades\Route;

Route::controller(ErrorReportingController::class)
    ->group(function () {
        Route::get('', 'index');
        Route::get('create-dump', 'downloadDump');
        Route::get('{error}', 'show');
    });
