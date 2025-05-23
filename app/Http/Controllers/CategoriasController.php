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
    public function index(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $filter = $request->input('filter', null);
        $data = Categoria::when($filter, function ($q) use ($filter) {
            $q->where('nombre', 'like', "%$filter%");
        })->paginate($perPage, ['*'], 'page', $page);

        return Response::success($data);
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
