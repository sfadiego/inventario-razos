<?php

namespace App\Printer\Connectors;

use App\Printer\Interface\PrinterConnectorInterface;
use Mike42\Escpos\PrintConnectors\CupsPrintConnector;
use Mike42\Escpos\Printer;

class CupsConnector implements PrinterConnectorInterface
{
    protected $connector;
    protected $printer;
    protected $printerName;
    public function __construct()
    {
        $this->printerName = env('PRINTER_NAME');
    }
    public function init(): void
    {
        $this->connector = new CupsPrintConnector($this->printerName); // verificar que el printer esté configurado 
        $this->printer = new Printer($this->connector);
    }

    public function write(string $data): void
    {
        $this->printer->text($data);
    }

    public function cut(): void
    {
        $this->printer->cut();
    }

    public function pulse(): void
    {
        $this->printer->pulse();
    }

    public function close(): void
    {
        $this->printer->close();
    }

    public function getPrinter(): Printer
    {
        return $this->printer;
    }
}
