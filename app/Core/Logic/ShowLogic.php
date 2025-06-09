<?php

namespace App\Core\Logic;

use App\Core\Data\IndexData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

//TODO: revisar a detalle ShowLogic
class ShowLogic
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

    public function makeQuery(int $id): Builder
    {
        if (method_exists($this->modelo, 'scopeIndex') || method_exists($this->modelo, 'index')) {
            return $this->modelo->index();
        }

        return $this->modelo->newQuery()
            ->where('id', $id);
    }

    public function run(IndexData $data): JsonResponse
    {
        return Response::success($this->withResource());
    }

    protected function withResource(): mixed
    {
        return $this->response;
    }
}
