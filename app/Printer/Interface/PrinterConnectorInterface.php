<?php

namespace App\Printer\Interface;

use Mike42\Escpos\Printer;

interface PrinterConnectorInterface
{
    // inicia la conexion con la impresora
    public function init(): void;

    public function write(string $data): void;

    // cortar papel (verificar si se usa)
    public function cut(): void;

    // mandar un pulso para la caja registradora (verificar si se usa)
    public function pulse(): void;

    public function close(): void;

    /** Devuelve la instancia de Mike42\Escpos\Printer */
    public function getPrinter(): Printer;
}
