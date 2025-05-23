<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProveedoresStoreRequest;
use App\Http\Requests\ProveedoresUpdateRequest;
use App\Models\Proveedor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProveedoresController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 10);
        $filter = $request->input('filter', null);
        $data = Proveedor::when($filter, function ($q) use ($filter) {
            $q->where('nombre', 'like', "%$filter%");
        })->paginate($perPage, ['*'], 'page', $page);

        return Response::success(Proveedor::all());
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
