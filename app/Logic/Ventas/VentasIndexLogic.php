<?php

namespace App\Logic\Ventas;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Enums\StatusVentaEnum;
use App\Http\Resources\VentasResource;
use App\Models\Venta;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VentasIndexLogic extends IndexLogic
{
    public function __construct(Venta $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'nombre_venta' => 'Nombre',
            'folio' => 'folio',
            'cliente.nombre' => 'Cliente',
            'tipo_compra' => 'Tipo de compra',
            'venta_total' => 'Total',
            'status_venta' => 'Estatus',
            'actions' => '#',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        $defaultStatus = [
            'property' => 'status_venta',
            'operator' => 'like',
            'value' => StatusVentaEnum::Activa->value,
        ];
        $data->filters = $data->filters ? $data->filters : [$defaultStatus];

        return parent::run($data);
    }

    protected function withResource(): AnonymousResourceCollection
    {
        return VentasResource::collection($this->response);
    }
}
