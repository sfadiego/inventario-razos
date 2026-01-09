<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Spatie\DbDumper\Databases\MySql;

trait BackupDatabase
{
    public function createDumpDatabase($customName = null)
    {
        return false;
        $backupPath = storage_path('app/backups');

        if (! is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
        }

        $filename = $customName ? "$customName-" : 'backup-';
        $filename = $filename.date('Y-m-d_H-i').'.sql';
        $fullPath = "$backupPath/$filename";

        if (! config('customconfig.dump_path')) {
            Log::info('Path del dump no configurado, omitiendo backup');

            return [
                'success' => false,
                'fullPath' => $fullPath,
                'filename' => $filename,
            ];
        }

        $db = config('database.connections.mysql');

        MySql::create()
            ->setDbName($db['database'])
            ->setUserName($db['username'])
            ->setPassword($db['password'])
            ->setHost($db['host'])
            // ->addExtraOption('--ssl-mode=DISABLED')
            ->setDumpBinaryPath(config('customconfig.dump_path'))
            ->dumpToFile($fullPath);

        Log::info("Backup creado en: {$fullPath}");

        return [
            'fullPath' => $fullPath,
            'filename' => $filename,
        ];
    }
}
