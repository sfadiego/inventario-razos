<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\ReporteMovimiento\ReporteMovimientoStoreRequest;
use App\Http\Requests\ReporteMovimiento\ReporteMovimientoUpdateRequest;
use App\Logic\ReporteMovimientos\ReporteMovimientosIndexLogic;
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
        $reporteMovimiento = ReporteMovimiento::create($params->validated());

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
