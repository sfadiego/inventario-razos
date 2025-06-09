<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Ventas\VentaStoreRequest;
use App\Logic\VentaProductos\ProductosByVentaLogic;
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

    public function productoVenta(IndexData $data, ProductosByVentaLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
