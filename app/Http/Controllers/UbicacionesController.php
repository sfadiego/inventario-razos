<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Ubicaciones\UbicacionesStoreRequest;
use App\Http\Requests\Ubicaciones\UbicacionesUpdateRequest;
use App\Logic\Ubicacion\UbicacionIndexLogic;
use App\Models\Ubicacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class UbicacionesController extends Controller
{
    public function index(IndexData $data, UbicacionIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(UbicacionesStoreRequest $params): JsonResponse
    {
        $ubicacion = Ubicacion::create($params->all());

        return Response::success($ubicacion);
    }

    public function show(Ubicacion $ubicacion): JsonResponse
    {
        return Response::success($ubicacion);
    }

    public function update(UbicacionesUpdateRequest $params, Ubicacion $ubicacion): JsonResponse
    {
        $ubicacion->update($params->validated());

        return Response::success($ubicacion);
    }

    public function delete(Ubicacion $ubicacion): JsonResponse
    {
        $ubicacion->delete();

        return Response::success('', 'Ubicación eliminada');
    }
}
