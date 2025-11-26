<?php

namespace App\Http\Controllers;

use App\Http\Requests\Subcategorias\SubcategoriasStoreRequest;
use App\Http\Requests\Subcategorias\SubcategoriasUpdateRequest;
use App\Models\Categoria;
use App\Models\Subcategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class SubcategoriasController extends Controller
{
    public function index(Categoria $categoria): JsonResponse
    {
        return Response::success($categoria->subcategorias);
    }

    public function show(Categoria $categoria, int $subcategoriaId): JsonResponse
    {
        $subcategoria = $categoria->subcategorias()->findOrFail($subcategoriaId);

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
