<?php

namespace App\Http\Controllers;

use App\Enums\StatusVentaEnum;
use App\Http\Requests\Dashboard\DashboardTotalRequest;
use App\Models\Venta;
use App\Models\VentaProducto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class DashboardController extends Controller
{
    public function totalVentas(DashboardTotalRequest $param): JsonResponse
    {
        $fecha = $param?->fecha;
        $ventas = Venta::where('status_venta', StatusVentaEnum::Finalizada)
            ->whereHas('ventaProductos', fn ($q) => $q->withTrashed())
            ->when($fecha, function ($q) use ($fecha) {
                $q->where('created_at', '>=', $fecha);
            })->sum('venta_total');

        return Response::success(['total' => $ventas]);
    }

    public function ventas(): JsonResponse
    {
        $months = collect([
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]);

        $ventasPorMes = Venta::where('status_venta', StatusVentaEnum::Finalizada)
            ->whereHas('ventaProductos', fn ($q) => $q->withTrashed())
            ->whereYear('created_at', now()->year)
            ->get()
            ->groupBy(fn ($venta) => $venta->created_at->format('F'))
            ->map(fn ($ventas) => [
                'total' => $ventas->sum('venta_total'),
                'cantidad' => $ventas->count(),
            ]);

        $resultados = $months->map(fn ($mes) => [
            'month' => $mes,
            'total' => round($ventasPorMes[$mes]['total'] ?? 0, 2),
            'cantidad' => $ventasPorMes[$mes]['cantidad'] ?? 0,
        ]);

        return Response::success($resultados);
    }

    public function menosVendidos(Request $request): JsonResponse
    {
        $categoriaId = $request->get('categoria_id') ?? null;

        $ventas = VentaProducto::menosVendidos(categoriaId: $categoriaId);

        return Response::success($ventas);
    }

    public function masVendidos(Request $request): JsonResponse
    {
        $categoriaId = $request->get('categoria_id') ?? null;

        $ventas = VentaProducto::masVendidos(categoriaId: $categoriaId);

        return Response::success($ventas);
    }
}
