<?php

namespace App\Logic\Producto;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;


class ProductoIndexLogic extends IndexLogic
{

  public function __construct(Producto $modelo)
  {
    parent::__construct($modelo);
  }

  protected function tableHeaders(): array
  {
    return [];
  }

  public function run(IndexData $data): JsonResponse
  {
    return parent::run($data);
  }
}
