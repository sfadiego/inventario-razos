<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Ventas\FilanizarVentaRequest;
use App\Http\Requests\Ventas\VentaStoreRequest;
use App\Http\Requests\Ventas\VentaUpdateRequest;
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

    public function update(VentaUpdateRequest $params, Venta $venta): JsonResponse
    {
        $venta->update($params->validated());
        return Response::success($venta);
    }

    public function show(Venta $venta): JsonResponse
    {
        $venta->load(['cliente']);
        return Response::success($venta);
    }

    public function productoVenta(IndexData $data, ProductosByVentaLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function finalizarVenta(Venta $venta): JsonResponse
    {
        try {
            $venta->finalizarVenta();
            return Response::success($venta);
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }

    public function countProductos(Venta $venta): JsonResponse
    {
        $venta = $venta->ventaProductos()->count();

        return Response::success(['total' => $venta]);
    }
}
