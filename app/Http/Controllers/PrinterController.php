<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Printer\Data\VentaTicketData;
use App\Printer\Factory\ConnectorFactory;
use App\Printer\Formatters\VentaFormatter;
use App\Printer\Service\PrinterService;
use Illuminate\Support\Facades\Response;

class PrinterController extends Controller
{
    public function print(Venta $venta)
    {
        try {
            $connector = ConnectorFactory::make();
            if (! $connector->isActiveConnection()) {
                return Response::error('Impresora no conectada');
            }
            $formatter = new VentaFormatter;
            $printerService = new PrinterService($connector, $formatter);
            $ticketData = new VentaTicketData($venta);
            $printerService->printTicket($ticketData);

            return Response::success($venta, 'Impresión enviada');
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }
}
