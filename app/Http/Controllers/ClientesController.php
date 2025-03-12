<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientesStoreRequest;
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

    public function update(ClientesStoreRequest $params, Cliente $cliente): JsonResponse
    {
        $cliente->update($params->validate());
        return Response::success($cliente);
    }

    public function delete(Cliente $cliente): JsonResponse
    {
        return Response::success($cliente->delete());
    }
}
