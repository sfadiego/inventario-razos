<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\TipoMovimiento\TipoMovimientoStoreRequest;
use App\Http\Requests\TipoMovimiento\TipoMovimientoUpdateRequest;
use App\Logic\TipoMovimiento\TipoMovimientoIndexLogic;
use App\Models\TipoMovimiento;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class TipoMovimientoController extends Controller
{
    public function index(IndexData $data, TipoMovimientoIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(TipoMovimientoStoreRequest $params): JsonResponse
    {
        $tipoMovimiento = TipoMovimiento::create($params->validated());

        return Response::success($tipoMovimiento);
    }

    public function show(TipoMovimiento $tipoMovimiento): JsonResponse
    {
        return Response::success($tipoMovimiento);
    }

    public function update(TipoMovimientoUpdateRequest $params, TipoMovimiento $tipoMovimiento): JsonResponse
    {
        $tipoMovimiento->update($params->validated());

        return Response::success($tipoMovimiento);
    }

    public function delete(TipoMovimiento $tipoMovimiento): JsonResponse
    {
        $tipoMovimiento->delete();

        return Response::success('', 'Tipo de movimiento eliminado');
    }
}
