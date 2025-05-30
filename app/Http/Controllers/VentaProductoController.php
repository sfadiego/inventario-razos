<?php

namespace App\Http\Controllers;

use App\Models\VentaProducto;
use Illuminate\Support\Facades\Response;
use Illuminate\Http\JsonResponse;

class VentaProductoController extends Controller
{
    public function delete(VentaProducto $ventaProducto): JsonResponse
    {
        $ventaProducto->delete();

        return Response::success(null, 'Borrado correctamente');
    }
}
