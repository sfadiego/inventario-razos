<?php

namespace App\Models;

use App\Enums\StatusVentaEnum;
use App\Enums\TipoCompraEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Venta extends Model
{
    use HasFactory;

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
        $folio = 'VENTA-'.date('Ymd').'-'.str_pad($newFolio, 4, '0', STR_PAD_LEFT);

        return self::create([
            'venta_total' => $data['venta_total'] ?? 0,
            'nombre_venta' => $data['nombre_venta'] ?? '',
            'folio' => $folio,
            'cliente_id' => $data['cliente_id'] ?? null,
            'tipo_compra' => $data['tipo_compra'] ?? TipoCompraEnum::Contado->value,
            'status_venta' => StatusVentaEnum::Activa->value,
        ]);
    }

    public function finalizarVenta(Venta $venta): Venta
    {
        $venta->update([
            'status_venta' => StatusVentaEnum::Finalizada->value,
        ]);

        return $venta;
    }
}
