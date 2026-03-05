<?php

namespace App\Http\Controllers;

use App\Enums\StatusVentaEnum;
use App\Enums\TipoCompraEnum;
use App\Http\Requests\Clientes\AdeudosUpdateRequest;
use App\Models\Cliente;
use App\Models\HistorialAdeudo;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class AdeudosController extends Controller
{

    public function liquidarAdeudos(Cliente $cliente): JsonResponse
    {
        $adeudos = HistorialAdeudo::where(['cliente_id' => $cliente->id, 'pagado' => false])->get();
        $cliente->adeudo = 0;
        $cliente->save();
        $adeudos->each(function ($adeudo) {
            $adeudo->update(['pagado' => true]);
        });

        return Response::success($adeudos, 'Adeudos liquidado');
    }

    public function update(HistorialAdeudo $adeudo): JsonResponse
    {
        if ($adeudo->pagado) {
            return Response::error('Adeudo ya pagado');
        }
        $cliente = $adeudo->load('cliente');
        $adeudoTotalCliente = $cliente->cliente->adeudo;
        $adeudoApagar = $adeudo->total_adeudo;
        $total = $adeudoTotalCliente - $adeudoApagar;
        $cliente->cliente->update(['adeudo' => $total]);
        $adeudo->update([
            'pagado' => true,
            'updated_at' => now(),
        ]);

        return Response::success($adeudo, 'Adeudo liquidado');
    }
}
