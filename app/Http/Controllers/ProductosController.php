<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductosStoreRequest;
use App\Http\Requests\ProductosUpdateRequest;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductosController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(Producto::all());
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
