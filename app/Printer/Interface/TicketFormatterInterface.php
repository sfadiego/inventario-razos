<?php

namespace App\Printer\Interface;

use App\Printer\Dto\TicketDataInterface;
use Mike42\Escpos\Printer;

// utilizada para formatear los datos del ticket
interface TicketFormatterInterface
{
    /** Recibe un DTO que representa cualquier tipo de ticket */
    public function format(TicketDataInterface $data, Printer $connector): string;
}
