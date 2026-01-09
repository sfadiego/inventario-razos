<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Marca\MarcaStoreRequest;
use App\Http\Requests\Marca\MarcaUpdateRequest;
use App\Logic\Marca\MarcaIndexLogic;
use App\Models\Marca;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class MarcaController extends Controller
{
    public function index(IndexData $data, MarcaIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(Marca $marca): JsonResponse
    {
        return Response::success($marca);
    }

    public function store(MarcaStoreRequest $params): JsonResponse
    {
        $marca = Marca::create($params->all());

        return Response::success($marca);
    }

    public function update(MarcaUpdateRequest $params, Marca $marca): JsonResponse
    {
        $marca->update($params->validated());

        return Response::success($marca);
    }

    public function delete(Marca $marca): JsonResponse
    {
        $marca->delete();

        return Response::success('', 'Marca eliminada');
    }
}
