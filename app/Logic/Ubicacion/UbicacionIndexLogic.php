<?php

namespace App\Logic\Producto;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\UbicacionResource;
use App\Models\Ubicacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UbicacionIndexLogic extends IndexLogic
{
    public function __construct(Ubicacion $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'nombre' => 'Nombre',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return UbicacionResource::collection($this->response);
    }
}
