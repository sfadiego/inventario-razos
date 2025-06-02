<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\TipoCompraEnum;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'venta';

    protected $fillable = [
        'venta_total',
        'nombre_venta',
        'cliente_id',
        'tipo_compra',
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
        return self::create([
            'venta_total' => $data['venta_total'] ?? 0,
            'nombre_venta' => $data['nombre_venta'] ?? '',
            'cliente_id' => $data['cliente_id'] ?? null,
            'tipo_compra' => $data['tipo_compra'] ?? TipoCompraEnum::Contado->value,
        ]);
    }
}
