<?php

namespace App\Http\Controllers;

use App\Models\VentaProducto;
use Illuminate\Http\JsonResponse;

class VentaProductoController extends Controller
{
    public function delete(VentaProducto $ventaProducto): JsonResponse
    {
        $ventaProducto->delete();

        return response()->json(['message' => 'Borrado correctamente.']);
    }
}
