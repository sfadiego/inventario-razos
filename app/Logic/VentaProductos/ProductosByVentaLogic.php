<?php

namespace App\Logic\VentaProductos;

use App\Core\Data\IndexData;
use App\Core\Logic\ShowLogic;
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
            'cantidad' => 'Cantidad',
            'precio' => 'Precio',
            'producto_id' => 'Producto',
            'venta_id' => 'Venta',
            'actions' => __('#'),
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        $productos = $this->modelo->where('venta_id', $data->params['venta_id'] ?? 0);
        $paginator = $productos->paginate($data->limit, ['*'], 'page', $data->page);

        return Response::successDataTable(
            new LengthAwarePaginator(
                $paginator->getCollection(),
                $paginator->total(),
                $paginator->perPage(),
                $paginator->currentPage()
            ),
            $this->tableHeaders()
        );
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return VentasResource::collection($this->response);
    }
}
