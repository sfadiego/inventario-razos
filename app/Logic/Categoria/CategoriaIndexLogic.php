<?php

namespace App\Logic\Categoria;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\CategoriaResource;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoriaIndexLogic extends IndexLogic
{
    public function __construct(Categoria $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'nombre' => 'Nombre',
            'activa' => 'Activa',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return CategoriaResource::collection($this->response);
    }
}
