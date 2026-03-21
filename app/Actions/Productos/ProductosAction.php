<?php

namespace App\Actions\Productos;

use App\Models\Producto;

class ProductosAction
{
    public function updateStock(Producto $producto, int $quantity, string $action = '+'): void
    {
        $increase = $action === '+';
        $producto->update(['stock' => $producto->stock + ($increase ? $quantity : -$quantity)]);
    }
}
