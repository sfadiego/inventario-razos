<?php

namespace App\Logic\Proveedor;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\ProveedorResource;
use App\Models\Proveedor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

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
            'observaciones' => 'Observaciones',
            'actions' => '#',
        ];
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return ProveedorResource::collection($this->response);
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
