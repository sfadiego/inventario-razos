<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Enums\TipoMovimientoEnum;
use App\Http\Requests\Productos\ProductosStoreRequest;
use App\Http\Requests\Productos\ProductosUpdateRequest;
use App\Logic\Producto\ProductoIndexLogic;
use App\Models\Producto;
use App\Models\ReporteMovimiento;
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

        if ($params->file('file')) {
            $image = $producto->handleProductoImage($params->file('file'));
            $producto->imagen()->associate($image);
        }

        ReporteMovimiento::create([
            'producto_id' => $producto->id,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'cantidad' => $params->stock,
            'cantidad_anterior' => 0,
            'cantidad_actual' => $params->stock,
            'user_id' => auth()->user()->id,
            'created_at' => now(),
        ]);

        return Response::success($producto);
    }

    public function show(Producto $producto): JsonResponse
    {
        $producto->load(['proveedor', 'ubicacion', 'categoria', 'imagen']);

        return Response::success($producto);
    }

    public function update(ProductosUpdateRequest $params, Producto $producto): JsonResponse
    {
        $oldStock = $producto->stock;

        if ($params->file('file')) {
            $image = $producto->handleProductoImage($params->file('file'));
            $producto->imagen()->associate($image);
        }
        $producto->update($params->validated());

        if ($producto->stock != $oldStock) {
            $tipoMovimiento = $producto->stock > $oldStock
                ? TipoMovimientoEnum::ENTRADA->value
                : TipoMovimientoEnum::SALIDA->value;

            ReporteMovimiento::create([
                'producto_id' => $producto->id,
                'tipo_movimiento_id' => $tipoMovimiento,
                'cantidad' => abs($producto->stock - $oldStock),
                'cantidad_anterior' => $oldStock,
                'cantidad_actual' => $producto->stock,
                'user_id' => auth()->user()->id,
                'created_at' => now(),
            ]);
        }

        return Response::success($producto);
    }

    public function delete(Producto $producto): JsonResponse
    {
        if (! $producto || ! $producto->activo) {
            return Response::error('Producto no encontrado');
        }

        $producto->update([
            'activo' => false,
        ]);

        return Response::success('', 'Producto eliminado correctamente');
    }
}
