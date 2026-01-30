<?php

namespace App\Printer\Data;

use App\Models\Venta;
use App\Printer\Dto\TicketDataInterface;

class VentaTicketData implements TicketDataInterface
{
    private $venta;
    public function __construct(Venta $venta)
    {
        $this->venta = $venta;
    }
    public function getType(): string
    {
        return 'venta';
    }

    public function toArray(): array
    {
        $this->venta->load('ventaProductos');
        $venta_total = $this->venta->venta_total;
        $nombre_venta = $this->venta->nombre_venta;
        $folio = $this->venta->folio;
        $cliente_id = $this->venta->cliente_id;
        $tipo_compra = $this->venta->tipo_compra;
        $status_venta = $this->venta->status_venta;
        $created_at = $this->venta->created_at;
        return [
            'venta_total' => $venta_total,
            'nombre_venta' => $nombre_venta,
            'folio' => $folio,
            'cliente_id' => $cliente_id,
            'tipo_compra' => $tipo_compra,
            'status_venta' => $status_venta,
            'created_at' => $created_at,
            'ventaProductos' => $this->venta->ventaProductos->map(function ($item) {
                return [
                    'cantidad' => $item->cantidad,
                    'precio' => $item->precio,
                    'descuento' => $item->descuento,
                    'producto_id' => $item->producto_id,
                    'venta_id' => $item->venta_id,
                ];
            }),
        ];
    }
}
