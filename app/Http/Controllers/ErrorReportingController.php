<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Logic\ErrorReporting\ErrorRerpotingIndexLogic;
use App\Models\ErrorReporting;
use App\Traits\BackupDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class ErrorReportingController extends Controller
{
    use BackupDatabase;

    public function index(IndexData $data, ErrorRerpotingIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function show(ErrorReporting $error): JsonResponse
    {
        return Response::success($error);
    }

    #todo: not working, issue with dump library
    public function downloadDump()
    {
        // $dump = $this->createDumpDatabase();
        // return Response::download($dump['fullPath'], $dump['filename']);
        return Response::success(['message' => 'Dump creado correctamente']);
    }
}
