<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ventas\VentaStoreRequest;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class VentasController extends Controller
{
    public function store(VentaStoreRequest $params): JsonResponse
    {
        $venta = Venta::createVenta($params->all());

        return Response::success($venta);
    }
}
