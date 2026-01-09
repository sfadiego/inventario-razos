<?php

namespace App\Http\Middleware;

use App\Models\ErrorReporting as ModelsErrorReporting;
use App\Traits\BackupDatabase;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ErrorReporting
{
    use BackupDatabase;

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response->getStatusCode() == 500) {
            Log::error('Fatal Error', [
                'endpoint' => $request->path(),
                'method' => $request->method(),
                'error_message' => $response->exception?->getMessage() ?? 'Unknown error',
            ]);
        }

        if ($response->getStatusCode() > 400) {
            ModelsErrorReporting::create([
                'endpoint' => $request->path(),
                'method' => $request->method(),
                'status_code' => $response->getStatusCode(),
                'error_message' => $response->exception?->getMessage() ?? 'Unknown error',
                'request_payload' => $request->all(),
                'response_body' => $response->getContent(),
            ]);
        }

        return $response;
    }
}
