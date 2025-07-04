<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Productos\ProductosStoreRequest;
use App\Http\Requests\Productos\ProductosUpdateRequest;
use App\Logic\Producto\ProductoIndexLogic;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ProductosController extends Controller
{
    public function index(IndexData $data, ProductoIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(ProductosStoreRequest $params): JsonResponse
    {
        $params->merge([
            'codigo' => Producto::createFolio($params->get('nombre')),
        ]);

        $producto = Producto::create($params->all());

        return Response::success($producto);
    }

    public function show(Producto $producto): JsonResponse
    {
        $producto->load(['proveedor', 'ubicacion', 'categoria']);

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
