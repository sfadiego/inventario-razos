<?php

namespace App\Logic\Marca;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Marca;
use Illuminate\Http\JsonResponse;

class MarcaIndexLogic extends IndexLogic
{
    public function __construct(Marca $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre' => 'Nombre',
            'actions' => '#',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
