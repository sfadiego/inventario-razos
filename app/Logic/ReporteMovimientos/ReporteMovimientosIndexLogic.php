<?php

namespace App\Logic\ReporteMovimientos;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\ReporteMovimiento;
use Illuminate\Http\JsonResponse;

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
            'producto_id' => 'Producto',
            'tipo_movimiento_id' => 'Tipo movimiento',
            'motivo' => 'Motivo',
            'cantidad' => 'Cantidad',
            'cantidad_anterior' => 'Cantidad anterior',
            'cantidad_actual' => 'Cantidad actual',
            'user_id' => 'Usuario',
            'fecha_movimiento' => 'Fecha movimiento',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
