<?php

namespace App\Printer\Formatters;

use App\Printer\Dto\TicketDataInterface;
use App\Printer\Interface\TicketFormatterInterface;
use Mike42\Escpos\Printer;

class VentaFormatter implements TicketFormatterInterface
{
    public function format(TicketDataInterface $data, Printer $connector): void
    {
        $payload = $data->toArray();
        $connector->initialize();
        $connector->setTextSize(1, 1);
        $connector->setEmphasis(true);
        $connector->setJustification(Printer::JUSTIFY_CENTER);
        $connector->text(env('APP_FULL_NAME', ''));
        $connector->setEmphasis(false);
        $connector->feed(1);

        $venta_total = $payload['venta_total'];
        $venta_nombre = $payload['nombre_venta'];
        $venta_folio = $payload['folio'];
        $venta_tipo_compra = $payload['tipo_compra'];
        $venta_created_at = $payload['created_at'];
        $venta_items = $payload['ventaProductos'];

        $connector->setJustification(Printer::JUSTIFY_LEFT);
        $connector->text("Vendido a:");
        $connector->text($venta_nombre !== '' ? $venta_nombre : " sin nombre ");
        $connector->feed(1);
        $connector->text("Folio: " . $venta_folio);
        $connector->feed(1);
        $connector->text("Tipo de compra: " . $venta_tipo_compra);
        $connector->feed(1);
        $connector->text("Fecha: " . $venta_created_at);
        $connector->feed(1);
        $connector->text("Total: $" . $venta_total);
        $connector->feed(2);

        $connector->text("precio | cantidad | producto | codigo");
        $connector->feed(1);
        collect($venta_items)
            ->each(function ($item) use ($connector) {
                $connector->text("$" . $item['precio'] . " x " . $item['cantidad'] . "pzas - " . $item['producto_nombre']);
                $connector->text(" - " . $item['codigo'] . "\n");
                $connector->feed(1);
            });

        $connector->feed(2);
        $connector->setJustification(Printer::JUSTIFY_CENTER);
        $connector->text("Gracias por su compra");
        $connector->feed(2);
    }
}
