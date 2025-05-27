<?php

namespace App\Logic\Proveedor;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Proveedor;
use Illuminate\Http\JsonResponse;

class ProveedorIndexLogic extends IndexLogic
{
    public function __construct(Proveedor $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
            'empresa' => 'Empresa',
            'observaciones' => 'Observaciones',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
