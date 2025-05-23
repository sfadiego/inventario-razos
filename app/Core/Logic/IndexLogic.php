<?php

namespace App\Core\Logic;

use App\Core\Data\IndexData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class IndexLogic
{
  protected bool $withPagination = true;
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

  protected function buildQuery(): Builder
  {
    $queryBuilder = $this->modelo->newQuery();
    return $queryBuilder->when($this->modelo->filter, function (Builder $q) {
      $q->where($this->modelo->filter);
    });
  }

  public function run(IndexData $data): JsonResponse
  {
    if (!$this->modelo) {
      return Response::error("Modelo no definido");
    }

    $query = $this->buildQuery();
    if ($this->withPagination) {
      $query = $query->paginate($data->perPage, ['*'], 'page', $data->page);
      return Response::successDataTable($query, $this->tableHeaders());
    }

    return Response::success(
      $query->get()
    );
  }
}
