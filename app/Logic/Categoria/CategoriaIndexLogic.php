<?php

namespace App\Logic\Categoria;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Categoria;
use Illuminate\Http\JsonResponse;

class CategoriaIndexLogic extends IndexLogic
{
    public function __construct(Categoria $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
            'activa' => 'Activa',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
