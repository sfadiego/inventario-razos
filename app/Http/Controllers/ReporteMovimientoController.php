<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Enums\TipoMovimientoEnum;
use App\Http\Requests\ReporteMovimiento\ReporteMovimientoStoreRequest;
use App\Http\Requests\ReporteMovimiento\ReporteMovimientoUpdateRequest;
use App\Logic\ReporteMovimientos\ReporteMovimientosIndexLogic;
use App\Models\Producto;
use App\Models\ReporteMovimiento;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ReporteMovimientoController extends Controller
{
    public function index(IndexData $data, ReporteMovimientosIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(ReporteMovimientoStoreRequest $params): JsonResponse
    {
        $cantidad = $params->cantidad;
        if ($params->tipo_movimiento_id == TipoMovimientoEnum::ENTRADA->value && $cantidad < 0) {
            return Response::error('La cantidad no es válida para un movimiento de entrada.');
        }

        $producto = Producto::find($params->producto_id);
        $stockActual = $producto->stock;
        $nuevoStock = $stockActual + $cantidad;
        if ($nuevoStock < 0) {
            return Response::error('El stock no puede ser negativo.');
        }
        $params->merge([
            'cantidad_anterior' => $stockActual,
            'cantidad_actual' => $nuevoStock,
            'user_id' => auth()->user()->id,
            'created_at' => now(),
        ]);

        $reporteMovimiento = ReporteMovimiento::create($params->toArray());
        $producto->update(['stock' => $nuevoStock]);

        return Response::success($reporteMovimiento);
    }

    public function show(ReporteMovimiento $reporteMovimiento): JsonResponse
    {
        return Response::success($reporteMovimiento);
    }

    public function update(ReporteMovimientoUpdateRequest $request, ReporteMovimiento $reporteMovimiento): JsonResponse
    {
        $reporteMovimiento->update($request->validated());

        return Response::success($reporteMovimiento);
    }

    public function delete(ReporteMovimiento $reporteMovimiento): JsonResponse
    {
        return Response::success($reporteMovimiento->delete());
    }
}
