<?php

namespace App\Logic\TipoMovimiento;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\TipoMovimiento;
use Illuminate\Http\JsonResponse;

class TipoMovimientoIndexLogic extends IndexLogic
{
    public function __construct(TipoMovimiento $model)
    {
        parent::__construct($model);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
