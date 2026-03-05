<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Clientes\ClientesStoreRequest;
use App\Http\Requests\Clientes\ClientesUpdateRequest;
use App\Logic\Cliente\ClienteIndexLogic;
use App\Models\Cliente;
use App\Models\HistorialAdeudo;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ClientesController extends Controller
{
    public function index(IndexData $data, ClienteIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
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

    // TODO: crear test
    public function showAdeudo(Cliente $cliente): JsonResponse
    {
        $adeudos = HistorialAdeudo::where([
            'cliente_id' => $cliente->id,
            'pagado' => false,
        ])
            ->with('venta', function ($q) {
                $q->select('id', 'folio', 'nombre_venta');
            })
            ->select('id', 'total_adeudo', 'venta_id', 'created_at')
            ->get();

        return Response::success($adeudos);
    }

    public function update(ClientesUpdateRequest $params, Cliente $cliente): JsonResponse
    {
        $cliente->update($params->validated());

        return Response::success($cliente);
    }

    public function delete(Cliente $cliente): JsonResponse
    {
        $cliente->delete();

        return Response::success('', 'Cliente eliminado');
    }
}
