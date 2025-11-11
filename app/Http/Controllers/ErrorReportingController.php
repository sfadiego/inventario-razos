<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Logic\ErrorReporting\ErrorRerpotingIndexLogic;
use App\Models\ErrorReporting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ErrorReportingController extends Controller
{
    public function index(IndexData $data, ErrorRerpotingIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(ErrorReporting $error): JsonResponse
    {
        return Response::success($error);
    }
}
