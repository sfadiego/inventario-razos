<?php

namespace App\Core\Logic;

use App\Core\Classes\Filter;
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
        $customFilters = array_keys($this->customFilters());
        foreach ($filters as $filterData) {
            $property = $filterData['property'];
            $value = $filterData['value'];
            $operator = $filterData['operator'] ?? '=';
            $filter = new Filter($property, $value, $operator);

            if (in_array($property, $customFilters)) {
                $this->applyCustomFilter($filter);

                continue;
            }

            $this->queryBuilder = $filter->applyToQuery($this->queryBuilder);
        }

        return $this->queryBuilder;
    }

    public function run(IndexData $data): JsonResponse
    {
        if (! $this->modelo) {
            return Response::error('Modelo no definido');
        }

        $this->queryBuilder = $this->makeQuery();
        $this->queryBuilder->with($this->withRelations());

        if ($data->filters) {
            $this->queryBuilder = $this->runQueryFilters($data->filters);
        }

        if (isset($data->search)) {
            $this->queryBuilder = $this->runQueryWithSearch($data->search);
        }

        if ($this->withPagination) {
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

        $this->response = $this->queryBuilder->get();

        return Response::success($this->response);
    }

    public function runQueryWithSearch(string $search): Builder
    {
        if (in_array('search', array_keys($this->customFilters()))) {
            $this->applyCustomFilter(new Filter('search', $search, 'like'));

            return $this->queryBuilder;
        }

        return $this->queryBuilder->where($this->getColumnSearch(), 'like', "%{$search}%");
    }

    protected function withResource(): mixed
    {
        return $this->response;
    }

    protected function getColumnSearch(): string
    {
        return 'nombre';
    }

    protected function customFilters(): array
    {
        return [];
    }

    protected function withRelations(): array
    {
        return [];
    }

    protected function applyCustomFilter(Filter $filter): void
    {
        $customFilters = $this->customFilters();
        $property = $filter->property;

        if (isset($customFilters[$property])) {
            $filterCallback = $customFilters[$property];
            if (! is_callable($filterCallback)) {
                throw new \InvalidArgumentException("Filter for property {$property} is not callable.");
            }

            $filterCallback($filter);
        }
    }
}
