<?php

namespace App\Printer\Formatters;

use App\Printer\Dto\TicketDataInterface;
use App\Printer\Interface\TicketFormatterInterface;
use Mike42\Escpos\Printer;

class VentaFormatter implements TicketFormatterInterface
{
    // TODO: Implement format() method.
    public function format(TicketDataInterface $data, Printer $connector): string
    {
        $payload = $data->toArray();
        // $lines = [];
        // $lines[] = env('APP_FULL_NAME');
        // $lines[] = "";
        
        $output = "fb & ig: @" . env('APP_FULL_NAME') . "\n\n\n";

        return $output;
    }
}
