<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ubicaciones\UbicacionesStoreRequest;
use App\Http\Requests\Ubicaciones\UbicacionesUpdateRequest;
use App\Models\Ubicacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UbicacionesController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(Ubicacion::all());
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
        return Response::success($ubicacion->all());
    }
}
