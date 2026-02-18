<?php

namespace App\Printer\Connectors;

use App\Printer\Interface\PrinterConnectorInterface;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class FileConnector extends AbstractConnector implements PrinterConnectorInterface
{
    protected $fileName;

    protected $connector;

    protected $printer;

    protected $tempFile = null;

    protected $host;

    public function __construct()
    {
        $this->fileName = 'ticket';
        $this->host = env('PRINTER_HOST');
        $this->tempFile = tempnam(sys_get_temp_dir(), 'ticket-');
    }

    public function init(): void
    {
        $this->connector = new FilePrintConnector($this->tempFile);
        $this->printer = new Printer($this->connector);
    }

    public function close(): void
    {
        $this->printer->close();
    }
}
