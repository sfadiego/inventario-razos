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
        if ($params->categorias) {
            $proveedor->categorias()->sync($params->categorias);
        }

        return Response::success($proveedor);
    }

    public function show(Proveedor $proveedor): JsonResponse
    {
        $proveedor = $proveedor->load('categorias');

        return Response::success($proveedor);
    }

    public function update(ProveedoresUpdateRequest $params, Proveedor $proveedor): JsonResponse
    {
        $proveedor->update($params->validated());
        if ($params->categorias) {
            $proveedor->categorias()->sync($params->categorias);
        }

        return Response::success($proveedor);
    }

    public function delete(Proveedor $proveedor): JsonResponse
    {
        $proveedor->delete();
        return Response::success('', 'Proveedor eliminado');
    }
}
