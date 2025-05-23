<?php

namespace App\Core\Responses;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Response;

class Responses extends Controller
{

  protected bool $withPagination = false;
  protected LengthAwarePaginator $pagination;

  protected function response(): JsonResponse
  {
    if ($this->withPagination) {
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

    return Response::success(
      $this->withResource(),
    );
  }

  protected function tableHeaders(): array
  {
    return [];
  }

  protected function withResource(): mixed
  {
    return $this->response->map(function ($event) {

      return new RequestEventIndexResource($event);
    });
  }
}
