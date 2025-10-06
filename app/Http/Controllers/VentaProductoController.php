<?php

namespace App\Http\Controllers;

use App\Http\Requests\VentaProducto\VentaProductoStoreRequest;
use App\Http\Requests\VentaProducto\VentaProductoUpdateRequest;
use App\Models\Venta;
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

    public function update(VentaProductoUpdateRequest $params, VentaProducto $ventaProducto): JsonResponse
    {
        try {
            $params->merge(['venta_id' => $ventaProducto->venta_id]);
            if (! VentaProducto::validateVentaProducto($params->all(), false)) {
                throw new \Exception('No hay suficiente stock del producto seleccionado.');
            }

            $ventaProducto->update($params->validated());
            $venta = Venta::find($params->venta_id);
            $venta->update(['venta_total' => $venta->ventaTotal()]);

            return Response::success($ventaProducto);
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }

    public function delete(VentaProducto $ventaProducto): JsonResponse
    {
        $ventaProducto->delete();
        $ventaTotalItems = VentaProducto::where('venta_id', $ventaProducto->venta_id)->count();
        $venta = Venta::find($ventaProducto->venta_id);
        if (! $ventaTotalItems) {
            $venta->update(['venta_total' => 0]);
        }

        $venta->update(['venta_total' => $venta->ventaTotal()]);

        return Response::success(null, 'Borrado correctamente');
    }
}
