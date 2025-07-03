<?php

namespace App\Logic\VentaProductos;

use App\Core\Data\IndexData;
use App\Core\Logic\ShowLogic;
use App\Http\Resources\VentaProductoResource;
use App\Http\Resources\VentasResource;
use App\Models\VentaProducto;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

class ProductosByVentaLogic extends ShowLogic
{
    public function __construct(VentaProducto $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'producto.nombre' => 'Producto',
            'cantidad' => 'Cantidad',
            'precio' => 'Precio',
            'actions' => __('#'),
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        $this->queryBuilder = $this->modelo->newQuery();
        $this->pagination = $this->queryBuilder->where('venta_id', $data->params['venta_id'] ?? 0)
            ->paginate($data->limit, ['*'], 'page', $data->page);
        $this->response = $this->pagination->getCollection();
        return Response::successDataTable(
            new LengthAwarePaginator(
                $this->withResource(),
                $this->pagination->total(),
                $this->pagination->perPage(),
                $this->pagination->currentPage()
            ),
            $this->tableHeaders()
        );
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return VentaProductoResource::collection($this->response);
    }
}
