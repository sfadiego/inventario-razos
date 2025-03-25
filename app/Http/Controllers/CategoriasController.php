<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categorias\CategoriasStoreRequest;
use App\Http\Requests\Categorias\CategoriasUpdateRequest;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoriasController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(Categoria::all());
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
        return Response::success($categoria->delete());
    }
}
