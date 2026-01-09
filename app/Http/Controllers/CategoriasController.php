<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Categorias\CategoriasStoreRequest;
use App\Http\Requests\Categorias\CategoriasUpdateRequest;
use App\Logic\Categoria\CategoriaIndexLogic;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class CategoriasController extends Controller
{
    public function index(IndexData $data, CategoriaIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(Categoria $categoria): JsonResponse
    {
        return Response::success($categoria);
    }

    public function store(CategoriasStoreRequest $params): JsonResponse
    {
        $categoria = Categoria::create($params->all());

        return Response::success($categoria);
    }

    public function update(CategoriasUpdateRequest $params, Categoria $categoria): JsonResponse
    {
        $categoria->update($params->validated());

        return Response::success($categoria);
    }

    public function delete(Categoria $categoria): JsonResponse
    {
        $categoria->delete();

        return Response::success('', 'Categoría eliminada');
    }
}
