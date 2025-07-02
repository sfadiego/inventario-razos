<?php

namespace App\Http\Controllers;

use App\Http\Requests\VentaProducto\VentaProductoStoreRequest;
use App\Models\VentaProducto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class VentaProductoController extends Controller
{
    public function store(VentaProductoStoreRequest $request): JsonResponse
    {
        try {
            $ventaProducto = VentaProducto::createVentaProducto($request->all());
            return Response::success($ventaProducto);
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }

    public function delete(VentaProducto $ventaProducto): JsonResponse
    {
        $ventaProducto->delete();
        return Response::success(null, 'Borrado correctamente');
    }
}
