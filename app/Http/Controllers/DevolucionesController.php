<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Devoluciones\DevolucionesStoreRequest;
use App\Models\Devoluciones;
use App\Models\Producto;
use App\Models\ReporteMovimiento;
use App\Enums\TipoMovimientoEnum;
use App\Logic\Devoluciones\DevolucionesIndexLogic;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

// TODO: hacer pruebas
class DevolucionesController extends Controller
{

    public function index(IndexData $data, DevolucionesIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(Venta $venta): JsonResponse
    {
        $venta = $venta->load(['devolucion', 'cliente']);
        $venta->devolucion_id = $venta->devolucion?->id;
        return Response::success($venta);
    }

    public function store(DevolucionesStoreRequest $params): JsonResponse
    {

        $productIds = collect($params->productos)
            ->pluck('producto_id')
            ->toArray();

        $venta = Venta::where('id', $params->venta_id)
            ->with('ventaProductos', function ($q) use ($productIds) {
                $q->whereIn('producto_id', $productIds);
            })
            ->first();

        if ($venta->ventaProductos->count() === 0) {
            return Response::error('Los productos seleccionados no pertenecen a esta venta');
        }

        $devolucion = Devoluciones::create([
            'motivo' => $params->motivo,
            'venta_id' => $params->venta_id,
        ]);

        $total = 0;
        foreach ($params->productos as $item) {
            $productoId = $item['producto_id'];
            $devolucion->detalle()->create([
                'producto_id' => $productoId,
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $item['precio_unitario'],
            ]);

            $total += $item['cantidad'] * $item['precio_unitario'];

            $producto = Producto::find($productoId);
            $stockActual = $producto->stock;
            $nuevoStock = $stockActual + $item['cantidad'];
            $producto->update(['stock' => $nuevoStock]);

            ReporteMovimiento::create([
                'producto_id' => $productoId,
                'tipo_movimiento_id' => TipoMovimientoEnum::DEVOLUCION->value,
                'motivo' => $params->motivo,
                'cantidad' => $item['cantidad'],
                'cantidad_anterior' => $stockActual,
                'cantidad_actual' => $nuevoStock,
                'user_id' => auth()->user()->id,
                'created_at' => now(),
            ]);
        }

        $devolucion->update([
            'total_reembolsado' => $total,
        ]);

        return Response::success($devolucion);
    }
}
