<?php

namespace App\Logic\Cliente;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Cliente;
use Illuminate\Http\JsonResponse;

class ClienteIndexLogic extends IndexLogic
{
    public function __construct(Cliente $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
            'observaciones' => 'Observaciones',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
