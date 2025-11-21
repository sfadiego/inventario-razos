<?php

namespace App\Logic\Subcategoria;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Subcategoria;
use Illuminate\Http\JsonResponse;

class SubcategoriaIndexLogic extends IndexLogic
{
    public function __construct(Subcategoria $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
            'categoria_id' => 'Categoria',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
