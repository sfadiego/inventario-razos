<?php

namespace App\Http\Controllers;

use App\Http\Requests\Productos\ProductosStoreRequest;
use App\Http\Requests\Productos\ProductosUpdateRequest;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductosController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $filter = $request->input('filter', null);
        $data = Producto::when($filter, function ($q) use ($filter) {
            $q->where('nombre', 'like', "%$filter%");
        })->paginate($perPage, ['*'], 'page', $page);

        return Response::success($data);
    }

    public function store(ProductosStoreRequest $params): JsonResponse
    {
        $producto = Producto::create($params->all());

        return Response::success($producto);
    }

    public function show(Producto $producto): JsonResponse
    {
        return Response::success($producto);
    }

    public function update(ProductosUpdateRequest $params, Producto $producto): JsonResponse
    {
        $producto->update($params->validated());

        return Response::success($producto);
    }

    public function delete(Producto $producto): JsonResponse
    {
        return Response::success($producto->delete());
    }
}
