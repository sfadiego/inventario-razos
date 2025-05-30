<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Proveedores\ProveedoresStoreRequest;
use App\Http\Requests\Proveedores\ProveedoresUpdateRequest;
use App\Logic\Proveedor\ProveedorIndexLogic;
use App\Models\Proveedor;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ProveedoresController extends Controller
{
    public function index(IndexData $data, ProveedorIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(ProveedoresStoreRequest $params): JsonResponse
    {
        $proveedor = Proveedor::create($params->all());

        return Response::success($proveedor);
    }

    public function show(Proveedor $proveedor): JsonResponse
    {
        return Response::success($proveedor);
    }

    public function update(ProveedoresUpdateRequest $params, Proveedor $proveedor): JsonResponse
    {
        $proveedor->update($params->validated());

        return Response::success($proveedor);
    }

    public function delete(Proveedor $proveedor): JsonResponse
    {
        return Response::success($proveedor->delete());
    }
}
