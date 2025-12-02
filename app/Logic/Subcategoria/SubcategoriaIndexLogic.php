<?php

namespace App\Logic\Subcategoria;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Http\Resources\SubcategoriaResource;
use App\Models\Subcategoria;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

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
            'actions' => '#',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        if (empty($data->params['categoria'])) {
            return Response::error('Categoria no valida');
        }

        $this->queryBuilder = $this->modelo->newQuery();
        $this->pagination = $this->queryBuilder->where('categoria_id', $data->params['categoria'] ?? 0)
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
        return SubcategoriaResource::collection($this->response);
    }
}
