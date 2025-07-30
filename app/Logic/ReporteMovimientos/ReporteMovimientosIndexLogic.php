<?php

namespace App\Logic\ReporteMovimientos;

use App\Core\Classes\Filter;
use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\ReporteMovimientoResource;
use App\Models\ReporteMovimiento;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ReporteMovimientosIndexLogic extends IndexLogic
{
    public function __construct(ReporteMovimiento $model)
    {
        parent::__construct($model);
    }

    public function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'producto.nombre' => 'Producto',
            'tipo_movimiento.nombre' => 'Tipo movimiento',
            'motivo' => 'Motivo',
            'cantidad' => 'Cantidad',
            'cantidad_anterior' => 'Cantidad anterior',
            'cantidad_actual' => 'Cantidad actual',
            'user.name' => 'Usuario',
            'fecha_movimiento' => 'Fecha movimiento',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }

    public function filterProducto(Filter $filter): void
    {
        $this->queryBuilder->where(function ($query) use ($filter) {
            $query->whereHas('producto', function ($qwh) use ($filter) {
                $qwh->where('nombre', $filter->value);
            });
        });
    }


    protected function customFilters(): array
    {
        return [
            'search' => fn(Filter $filter) => $this->filterProducto($filter),
        ];
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return ReporteMovimientoResource::collection($this->response);
    }
}
