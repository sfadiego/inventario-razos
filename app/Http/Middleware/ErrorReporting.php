<?php

namespace App\Http\Middleware;

use App\Models\ErrorReporting as ModelsErrorReporting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ErrorReporting
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response->getStatusCode() >= 400) {
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
