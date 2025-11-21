<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Subcategorias\SubcategoriasStoreRequest;
use App\Http\Requests\Subcategorias\SubcategoriasUpdateRequest;
use App\Logic\Subcategoria\SubcategoriaIndexLogic;
use App\Models\Subcategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class SubcategoriasController extends Controller
{
    public function index(IndexData $data, SubcategoriaIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(Subcategoria $subcategoria): JsonResponse
    {
        return Response::success($subcategoria);
    }

    public function store(SubcategoriasStoreRequest $params): JsonResponse
    {
        $subcategoria = Subcategoria::create($params->all());

        return Response::success($subcategoria);
    }

    public function update(SubcategoriasUpdateRequest $params, Subcategoria $subcategoria): JsonResponse
    {
        $subcategoria->update($params->validated());

        return Response::success($subcategoria);
    }

    public function delete(Subcategoria $subcategoria): JsonResponse
    {
        return Response::success($subcategoria->delete());
    }
}
