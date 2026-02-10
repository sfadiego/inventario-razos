<?php

namespace App\Printer\Factory;

use App\Printer\Connectors\CupsConnector;
use App\Printer\Connectors\NetworkConnector;
use App\Printer\Connectors\WindowsConnector;
use App\Printer\Interface\PrinterConnectorInterface;

class ConnectorFactory
{
    public static function make(): PrinterConnectorInterface
    {
        // windows, macos, linux, cups
        $driver = env('PRINTER_DRIVER', 'windows');
        switch ($driver) {
            case 'network':
                return new NetworkConnector(env('CUPS_SERVER'));
            case 'linux':
            case 'macos':
            case 'cups': // CUPS (Common Unix Printing System), que es el sistema de impresión nativo de macOS y Linux.
                return new CupsConnector(env('PRINTER_NAME'));
            case 'windows':
            default:
                return new WindowsConnector(env('PRINTER_NAME') );
        }
    }
}
