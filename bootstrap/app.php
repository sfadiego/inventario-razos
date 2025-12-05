<?php

use App\Console\Commands\dbDump;
use App\Enums\HttpError;
use App\Http\Middleware\ErrorReporting;
use App\Http\Middleware\SetHeaders;
use App\Http\Middleware\Transactions\TransactionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function (Application $app) {
            Route::prefix('/api')
                ->middleware(['setHeaders', 'api', 'transaction', 'errorReporting'])
                ->group(base_path('routes/api.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleCors::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'setHeaders' => SetHeaders::class,
            'transaction' => TransactionMiddleware::class,
            'errorReporting' => ErrorReporting::class,
        ]);
    })
    ->withCommands([
        dbDump::class
    ])
    ->withExceptions(function (Exceptions $exceptions) {
        if (request()->is('api/*')) {
            $exceptions->render(function (ValidationException $e) {
                return Response::json([
                    'success' => false,
                    'data' => $e->errors(),
                ], HttpError::BadRequest->value);
            });
        }
    })->create();
