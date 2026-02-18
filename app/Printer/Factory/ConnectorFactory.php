<?php

namespace App\Printer\Factory;

use App\Printer\Connectors\CupsConnector;
use App\Printer\Connectors\FileConnector;
use App\Printer\Connectors\NetworkConnector;
use App\Printer\Connectors\SmbclientConnector;
use App\Printer\Connectors\WindowsConnector;
use App\Printer\Interface\PrinterConnectorInterface;

class ConnectorFactory
{
    public static function make(): PrinterConnectorInterface
    {
        $driver = env('PRINTER_DRIVER', 'windows');

        return match ($driver) {
            'smbclient' => new SmbclientConnector,
            'network' => new NetworkConnector,
            'file' => new FileConnector,
            'linux' => new CupsConnector,
            'macos' => new CupsConnector,
            'cups' => new CupsConnector,
            'windows' => new WindowsConnector
        };
    }
}
