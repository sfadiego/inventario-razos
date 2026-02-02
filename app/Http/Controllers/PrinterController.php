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
            $formatter = new VentaFormatter;
            $printerService = new PrinterService($connector, $formatter);
            $ticketData = new VentaTicketData($venta);
            $printerService->printTicket($ticketData);

            return Response::success('', 'Impresión enviada');
        } catch (\Throwable $th) {
            return Response::error($th->getMessage());
        }
    }
}
