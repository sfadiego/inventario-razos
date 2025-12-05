<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Logic\ErrorReporting\ErrorRerpotingIndexLogic;
use App\Models\ErrorReporting;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Spatie\DbDumper\Databases\MySql;

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

    public function downloadDump()
    {
        $backupPath = storage_path('app/backups');

        if (! is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        $filename = 'backup-' . date('Y-m-d_H-i-s') . '.sql';
        $fullPath =  "$backupPath/$filename";

        MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->setHost(env('DB_HOST'))
            ->setDumpBinaryPath('/opt/homebrew/bin')
            ->dumpToFile($fullPath);

        Log::info("Backup creado en: {$fullPath}");
        return Response::download($fullPath,  $filename);
    }
}
