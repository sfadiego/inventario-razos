<?php

namespace App\Printer\Dto;

interface TicketDataInterface
{
    /** Devuelve el tipo de ticket, p.e. order, refund, kitchen, generic */
    public function getType(): string;

    /** Devuelve los datos crudos en forma de array para el formatter */
    public function toArray(): array;
}
