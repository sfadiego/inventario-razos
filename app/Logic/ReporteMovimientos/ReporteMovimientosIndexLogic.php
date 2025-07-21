<?php

namespace App\Logic\ReporteMovimientos;

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

    protected function withResource(): AnonymousResourceCollection
    {
        return ReporteMovimientoResource::collection($this->response);
    }
}
