<?php

namespace App\Logic\Devoluciones;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Enums\StatusVentaEnum;
use App\Http\Resources\DevolucionResource;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

class DevolucionesIndexLogic extends IndexLogic
{
    public function __construct(Venta $modelo)
    {
        parent::__construct($modelo);
    }

    protected function getColumnSearch(): string
    {
        return 'folio';
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'created_at' => 'Fecha',
            'nombre_venta' => 'Nombre',
            'folio' => 'folio',
            'cliente.nombre' => 'Cliente',
            'tipo_compra' => 'Tipo de compra',
            'venta_total' => 'Total',
            'devolucion.status' => 'Estatus devolución',
            'actions' => '#',
        ];
    }

    public function withRelations(): array
    {
        return ['cliente', 'devolucion'];
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return DevolucionResource::collection($this->response);
    }

    public function run(IndexData $data): JsonResponse
    {

        $this->queryBuilder = $this->modelo->newQuery();
        $this->queryBuilder->with($this->withRelations());

        if (isset($data->search)) {
            $this->queryBuilder = $this->runQueryWithSearch($data->search);
        }

        $this->queryBuilder = $this->queryBuilder->where('status_venta', StatusVentaEnum::Finalizada);
        $this->orderQuery($data->orderParam, $data->order);
        $this->pagination = $this->queryBuilder->paginate($data->limit, ['*'], 'page', $data->page);
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
}
