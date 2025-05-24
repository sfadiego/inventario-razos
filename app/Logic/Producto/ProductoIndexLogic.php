<?php

namespace App\Logic\Producto;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\ProductoResource;
use App\Models\Producto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductoIndexLogic extends IndexLogic
{
  // protected bool $withPagination = false; // Uncomment this line if you want to disable pagination
  public function __construct(Producto $modelo)
  {
    parent::__construct($modelo);
  }

  protected function tableHeaders(): array
  {
    return [
      'nombre' => 'Nombre',
      'proveedor_id' => 'Proveedor',
      'categoria_id' => 'Categoria',
      'codigo' => 'Codigo',
      'precio_venta' => 'Precio Venta',
      'stock' => 'Stock',
      'ubicacion_id' => 'Ubicacion',
    ];
  }

  public function run(IndexData $data): JsonResponse
  {
    return parent::run($data);
  }

  protected function withResource(): AnonymousResourceCollection
  {
    return ProductoResource::collection($this->response);
  }
}
