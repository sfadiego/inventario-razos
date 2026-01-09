<?php

namespace App\Logic\Producto;

use App\Core\Classes\Filter;
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
            'actions' => 'Acciones',
            'codigo' => 'Codigo',
            'nombre' => 'Nombre',
            'stock' => 'Stock',
            'ubicacion.nombre' => 'Ubicacion',
            'categoria.nombre' => 'Categoria',
            'marca.nombre' => 'Marca',
            'precio_venta' => 'Precio Venta',
        ];
    }

    public function filterProducto(Filter $filter): void
    {
        $this->queryBuilder->where('codigo', $filter->value)
            ->orWhere('nombre', 'like', '%'.$filter->value.'%');
    }

    protected function customFilters(): array
    {
        return [
            'search' => fn (Filter $filter) => $this->filterProducto($filter),
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
