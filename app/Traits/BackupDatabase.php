<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Spatie\DbDumper\Databases\MySql;

trait BackupDatabase
{
    public function createDumpDatabase($customName = null)
    {
        $backupPath = storage_path('app/backups');

        if (! is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        $filename = $customName ? "$customName-" : 'backup-'.date('Y-m-d_H-i-s').'.sql';
        $fullPath = "$backupPath/$filename";

        MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->setHost(env('DB_HOST'))
            ->setDumpBinaryPath('/opt/homebrew/bin')
            ->dumpToFile($fullPath);

        Log::info("Backup creado en: {$fullPath}");

        return [
            'fullPath' => $fullPath,
            'filename' => $filename,
        ];
    }
}
