<?php

namespace App\Core\Logic;

use App\Core\Data\IndexData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

class IndexLogic
{
    protected bool $withPagination = true;

    protected $response = null;

    protected LengthAwarePaginator $pagination;

    protected ?Model $modelo = null;

    protected Builder $queryBuilder;

    public function __construct(?Model $modelo = null)
    {
        if (is_null($modelo)) {
            return;
        }
        $this->modelo = $modelo;
    }

    protected function tableHeaders(): array
    {
        return [];
    }

    public function makeQuery(): Builder
    {
        if (method_exists($this->modelo, 'scopeIndex') || method_exists($this->modelo, 'index')) {
            return $this->modelo->index();
        }

        return $this->modelo->newQuery();
    }

    protected function runQueryFilters(array $filters): Builder
    {
        $query = $this->queryBuilder->newQuery();
        foreach ($filters as $filter) {
            if ($filter['operator']) {
                $filterValue = match ($filter['operator']) {
                    'like' => "%" . $filter['value'] . "%",
                    default => $filter['value'],
                };

                $query->where($filter['property'], $filter['operator'], $filterValue);
            }
        }

        return $query;
    }

    public function run(IndexData $data): JsonResponse
    {
        if (! $this->modelo) {
            return Response::error('Modelo no definido');
        }

        $this->queryBuilder = $this->makeQuery();
        if ($data->filters) {
            $this->queryBuilder = $this->runQueryFilters($data->filters);
        }

        if ($this->withPagination) {
            $this->pagination = $this->queryBuilder->paginate($data->perPage, ['*'], 'page', $data->page);
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

        $this->response = $this->queryBuilder->get();

        return Response::success($this->response);
    }

    protected function withResource(): mixed
    {
        return $this->response;
    }
}
