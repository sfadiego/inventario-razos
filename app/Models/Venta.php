<?php

namespace App\Models;

use App\Enums\StatusVentaEnum;
use App\Enums\TipoCompraEnum;
use App\Enums\TipoMovimientoEnum;
use App\Traits\Movimientos;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Venta extends Model
{
    use HasFactory, Movimientos;

    protected $table = 'venta';

    protected $fillable = [
        'venta_total',
        'nombre_venta',
        'folio',
        'cliente_id',
        'tipo_compra',
        'status_venta',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function ventaProductos(): HasMany
    {
        return $this->hasMany(VentaProducto::class);
    }

    public static function createVenta(array $data): Venta
    {
        $lastFolio = Venta::latest()->value('folio');
        $newFolio = $lastFolio ? intval(substr($lastFolio, -4)) + 1 : 1;
        $folio = 'VENTA-' . date('Ymd') . '-' . str_pad($newFolio, 4, '0', STR_PAD_LEFT);

        return self::create([
            'venta_total' => $data['venta_total'] ?? 0,
            'nombre_venta' => $data['nombre_venta'] ?? '',
            'folio' => $folio,
            'cliente_id' => $data['cliente_id'] ?? null,
            'tipo_compra' => $data['tipo_compra'] ?? TipoCompraEnum::Contado->value,
            'status_venta' => StatusVentaEnum::Activa->value,
        ]);
    }

    public function finalizarVenta(): Venta
    {
        DB::beginTransaction();
        $result = collect($this->ventaProductos)->groupBy('producto_id')
            ->map(function ($items, $productoId) {
                return [
                    'producto_id' => $productoId,
                    'cantidad_total' => $items->sum('cantidad'),
                ];
            })
            ->map(function ($item) {
                $cantidadDescontar = $item['cantidad_total'];
                $producto = Producto::find($item['producto_id']);
                $stockOriginal = $producto->stock;
                $stockActual = $producto->stock - $cantidadDescontar;
                if ($stockActual < 0) {
                    DB::rollBack();
                    throw new Exception("No se puede descontar, stock insuficiente");
                }
                $producto->stock = $stockActual;
                $producto->update();
                $this->nuevoMovimiento([
                    'producto_id' => $producto->id,
                    'tipo_movimiento_id' => TipoMovimientoEnum::SALIDA->value,
                    'motivo' => 'Venta de producto',
                    'cantidad' => $cantidadDescontar,
                    'cantidad_anterior' => $stockOriginal,
                    'cantidad_actual' => $stockActual,
                    'user_id' => auth()->user()->id,
                ]);
            });

        $ventaTotal = $this->ventaProductos->sum(fn($item) => $item->cantidad * $item->precio);
        $this->update([
            'venta_total' => $ventaTotal,
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'updated_at' => now(),
        ]);
        DB::commit();
        return $this->refresh();
    }
}
