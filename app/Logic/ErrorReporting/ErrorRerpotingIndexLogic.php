<?php

namespace App\Logic\ErrorReporting;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\ErrorReporting;
use Illuminate\Http\JsonResponse;

class ErrorRerpotingIndexLogic extends IndexLogic
{
    public function __construct(ErrorReporting $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'endpoint' => 'Endpoint',
            'method' => 'Method',
            'status_code' => 'Status Code',
            'error_message' => 'Error Message',
            'created_at' => 'Fecha',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
