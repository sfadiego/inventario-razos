<?php

namespace App\Printer\Factory;

use App\Printer\Connectors\CupsConnector;
use App\Printer\Connectors\FileConnector;
use App\Printer\Connectors\NetworkConnector;
use App\Printer\Connectors\WindowsConnector;
use App\Printer\Interface\PrinterConnectorInterface;

class ConnectorFactory
{
    public static function make(): PrinterConnectorInterface
    {
        $driver = env('PRINTER_DRIVER', 'windows');
        switch ($driver) {
            case 'network':
                return new NetworkConnector();
            case 'file':
                return new FileConnector();
            case 'linux':
            case 'macos':
            case 'cups': // CUPS (Common Unix Printing System), que es el sistema de impresión nativo de macOS y Linux.
                return new CupsConnector();
            case 'windows':
            default:
                return new WindowsConnector();
        }
    }
}
