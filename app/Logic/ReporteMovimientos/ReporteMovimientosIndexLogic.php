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
            'created_at' => 'Fecha movimiento',
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
                $qwh->where('nombre', 'like', '%'.$filter->value.'%');
            });
        });
    }

    public function filterDate(Filter $filter): void
    {
        $this->queryBuilder->whereDate('created_at', $filter->value);
    }

    protected function customFilters(): array
    {
        return [
            'created_at' => fn (Filter $filter) => $this->filterDate($filter),
            'search' => fn (Filter $filter) => $this->filterProducto($filter),
        ];
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return ReporteMovimientoResource::collection($this->response);
    }
}
