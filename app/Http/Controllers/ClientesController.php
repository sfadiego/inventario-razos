<?php

namespace App\Http\Controllers;

use App\Http\Requests\Clientes\ClientesStoreRequest;
use App\Http\Requests\Clientes\ClientesUpdateRequest;
use App\Models\Cliente;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ClientesController extends Controller
{
    public function index(): JsonResponse
    {
        return Response::success(Cliente::all());
    }

    public function store(ClientesStoreRequest $params): JsonResponse
    {
        $cliente = Cliente::create($params->all());
        return Response::success($cliente);
    }

    public function show(Cliente $cliente): JsonResponse
    {
        return Response::success($cliente);
    }

    public function update(ClientesUpdateRequest $params, Cliente $cliente): JsonResponse
    {
        $cliente->update($params->validated());
        return Response::success($cliente);
    }

    public function delete(Cliente $cliente): JsonResponse
    {
        return Response::success($cliente->delete());
    }
}
