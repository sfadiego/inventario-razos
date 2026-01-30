<?php

namespace App\Printer\Service;

use App\Printer\Dto\TicketDataInterface;
use App\Printer\Interface\PrinterConnectorInterface;
use App\Printer\Interface\TicketFormatterInterface;

class PrinterService
{
    protected PrinterConnectorInterface $connector;
    protected TicketFormatterInterface $formatter;

    public function __construct(PrinterConnectorInterface $connector, TicketFormatterInterface $formatter)
    {
        $this->connector = $connector;
        $this->formatter = $formatter;
    }

    public function printTicket(TicketDataInterface $ticketData): void
    {
        $this->connector->init();
        $printer = $this->connector->getPrinter();
        $content = $this->formatter->format($ticketData, $printer);
        $this->connector->write($content);
        $this->connector->cut();
        $this->connector->pulse();
        $this->connector->close();
    }
}
