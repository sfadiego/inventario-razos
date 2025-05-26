<?php

namespace App\Logic\Cliente;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\ClienteResource;
use App\Models\Cliente;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ClienteIndexLogic extends IndexLogic
{
    public function __construct(Cliente $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'nombre' => 'Nombre',
            'observaciones' => 'Observaciones',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return ClienteResource::collection($this->response);
    }
}
