<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VentaProducto extends Model
{
    use HasFactory;

    protected $table = 'venta_producto';

    protected $fillable = ['cantidad', 'precio', 'producto_id', 'venta_id'];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function venta(): BelongsTo
    {
        return $this->belongsTo(Venta::class);
    }

    public static function createVentaProducto(array $data): VentaProducto
    {
        $productoActual = Producto::find($data['producto_id']);
        $ventaProductoActual = VentaProducto::where('venta_id', $data['venta_id'])->where('producto_id', $data['producto_id'])->first();
        $cantidadRequerida = ($ventaProductoActual->cantidad ?? 0) + $data['cantidad'] ?? $data['cantidad'];
        if ($productoActual->stock < $cantidadRequerida) {
            throw new \Exception('No hay suficiente stock del producto seleccionado.');
        }

        $ventaProducto = self::updateOrCreate([
            'producto_id' => $data['producto_id'],
            'venta_id' => $data['venta_id'],
        ], [
            'cantidad' => $cantidadRequerida,
            'precio' => $data['precio'],
        ]);

        $ventaTotal = self::where('venta_id', $data['venta_id'])
            ->get()
            ->sum(fn ($item) => $item->cantidad * $item->precio);

        Venta::where('id', $data['venta_id'])->update(['venta_total' => $ventaTotal]);

        return $ventaProducto;
    }
}
