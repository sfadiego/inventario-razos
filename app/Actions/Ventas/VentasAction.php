<?php

namespace App\Actions\Ventas;

use App\Models\Venta;
use App\Models\VentaProducto;

class VentasAction
{
    public function updateVentaProductoDevolucion(VentaProducto $ventaProducto, int $cantidad): void
    {
        if ($ventaProducto->cantidad - $cantidad < 0) {
            throw new \Exception('La cantidad a devolver es mayor que la cantidad vendida');
        }

        if ($ventaProducto->cantidad - $cantidad == 0) {
            $ventaProducto->delete();
        } else {

            $ventaProducto->cantidad = $ventaProducto->cantidad - $cantidad;
            $ventaProducto->save();
        }
    }

    public function updateVentaTotal(Venta $venta): void
    {
        $venta->refresh();
        $nuevoTotal = $venta->ventaTotal();
        $venta->update([
            'venta_total' => $nuevoTotal,
        ]);
    }
}
