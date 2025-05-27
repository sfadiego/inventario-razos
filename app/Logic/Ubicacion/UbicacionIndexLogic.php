<?php

namespace App\Logic\Ubicacion;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Ubicacion;
use Illuminate\Http\JsonResponse;

class UbicacionIndexLogic extends IndexLogic
{
    public function __construct(Ubicacion $modelo)
    {
        parent::__construct($modelo);
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
