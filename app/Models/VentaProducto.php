<?php

namespace App\Models;

use App\Enums\StatusVentaEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

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

    public static function validateVentaProducto(array $data, bool $sumarCantidad = true): false|int
    {
        $productoActual = Producto::find($data['producto_id']);
        $cantidadRequerida = $data['cantidad'];
        if ($sumarCantidad) {
            $ventaProductoActual = VentaProducto::where('venta_id', $data['venta_id'])->where('producto_id', $data['producto_id'])->first();
            $cantidadRequerida = ($ventaProductoActual->cantidad ?? 0) + $data['cantidad'] ?? $data['cantidad'];
        }

        if ($productoActual->stock < $cantidadRequerida) {
            return false;
        }

        return $cantidadRequerida;
    }

    public static function createVentaProducto(array $data): VentaProducto
    {
        $agregado = VentaProducto::where('venta_id', $data['venta_id'])->where('producto_id', $data['producto_id'])->first();
        if ($agregado) {
            throw new \Exception('El producto ya fue agregado a la venta.');
        }

        $cantidadRequerida = self::validateVentaProducto($data);

        if (! $cantidadRequerida) {
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
            ->sum(fn($item) => $item->cantidad * $item->precio);

        Venta::where('id', $data['venta_id'])->update(['venta_total' => $ventaTotal]);

        return $ventaProducto;
    }

    public static function menosVendidos(int $limit = 10): Collection
    {
        return self::selectRaw('producto_id, SUM(cantidad) as total')
            ->whereHas('venta', function ($q) {
                $q->where('status_venta', StatusVentaEnum::Finalizada);
            })
            ->with('producto')
            ->groupBy('producto_id')
            ->orderBy('total', 'asc')
            ->take($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'producto' => $item->producto->nombre,
                    'cantidad' => number_format($item->total, 2),
                ];
            })
            ->values();
    }

    public static function masVendidos(int $limit = 10, ?int $categoriaId = null): Collection
    {
        return self::selectRaw('producto_id, SUM(cantidad) as total')
            ->whereHas('venta', function ($q) {
                $q->where('status_venta', StatusVentaEnum::Finalizada);
            })
            ->with('producto')
            ->when($categoriaId, function ($q) use ($categoriaId) {
                $q->whereHas('producto', function ($q) use ($categoriaId) {
                    $q->where('categoria_id', $categoriaId);
                });
            })
            ->groupBy('producto_id')
            ->orderBy('total', 'desc')
            ->take($limit)
            ->get()
            ->map(function ($item) {
                return [
                    'image' => $item->producto?->imagen ? [
                        'id' => $item->producto->imagen->id,
                        'archivo' => $item->producto->imagen->archivo,
                        'path' => $item->producto->imagen->path,
                        'external' => $item->producto->imagen->external,
                    ] : null,
                    'producto' => $item->producto->nombre,
                    'categoria' => $item->producto->categoria->nombre,
                    'subcategoria' => $item->producto->subcategoria->nombre,
                    'cantidad' => number_format($item->total, 2),
                ];
            })
            ->values();
    }

    public static function reporteVentasPorCategoria($fecha_inicio, $fecha_fin, $order_date)
    {
        return VentaProducto::with('producto.categoria')
            ->whereHas('venta', function ($q) use ($fecha_inicio, $fecha_fin, $order_date) {
                $q->where('status_venta', StatusVentaEnum::Finalizada);
                $q->when($fecha_inicio && $fecha_fin, function ($q) use ($fecha_inicio, $fecha_fin) {
                    $q->whereBetween('created_at', [$fecha_inicio, $fecha_fin]);
                })
                    ->when($fecha_inicio && ! $fecha_fin, function ($q) use ($fecha_inicio) {
                        $q->where('created_at', '>=', $fecha_inicio);
                    })
                    ->when(! $fecha_inicio && $fecha_fin, function ($q) use ($fecha_fin) {
                        $q->where('created_at', '<=', $fecha_fin);
                    })
                    ->orderBy('created_at', $order_date);
            })
            ->get()
            ->groupBy(fn($item) => $item->producto->categoria->nombre)
            ->map(function ($item, $categoria) {
                return [
                    'categoria' => $categoria,
                    'total' => $item->sum(fn($i) => $i->cantidad * $i->precio),
                ];
            })->values();
    }
}
