<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\DbDumper\Databases\MySql;

class dbDump extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:backup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea un dump de la base de datos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Ruta de la carpeta donde guardar backups
        $backupPath = storage_path('app/backups');

        // Crear carpeta si no existe
        if (! is_dir($backupPath)) {
            mkdir($backupPath, 0755, true);
            $this->info("Carpeta creada: {$backupPath}");
        }

        $filename = $backupPath.'/backup-'.date('Y-m-d_H-i-s').'.sql';

        MySql::create()
            ->setDbName(env('DB_DATABASE'))
            ->setUserName(env('DB_USERNAME'))
            ->setPassword(env('DB_PASSWORD'))
            ->setHost(env('DB_HOST'))
            ->setDumpBinaryPath('/opt/homebrew/bin')
            ->dumpToFile($filename);

        $this->info("Backup creado en: {$filename}");
    }
}
