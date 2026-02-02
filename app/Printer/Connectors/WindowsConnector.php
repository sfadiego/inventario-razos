<?php

namespace App\Printer\Connectors;

use App\Printer\Interface\PrinterConnectorInterface;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;

class WindowsConnector implements PrinterConnectorInterface
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
        $this->connector = new WindowsPrintConnector($this->printerName);
        $this->printer = new Printer($this->connector);
    }

    public function initialize(): void
    {
        $this->printer->initialize();
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
