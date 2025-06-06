<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Ventas\VentaStoreRequest;
use App\Logic\Ventas\VentasIndexLogic;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class VentasController extends Controller
{
    public function index(IndexData $data, VentasIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(VentaStoreRequest $params): JsonResponse
    {
        $venta = Venta::createVenta($params->all());
        return Response::success($venta);
    }

    public function productoVenta(Venta $venta): JsonResponse
    {
        $productos = $venta->load('ventaProductos');
        return Response::success($productos?->ventaProductos);
    }
}
