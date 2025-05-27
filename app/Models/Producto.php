<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = ['nombre', 'proveedor_id', 'categoria_id', 'codigo', 'precio_compra', 'precio_venta', 'stock', 'cantidad_minima', 'compatibilidad', 'ubicacion_id', 'activo'];

    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function ubicacion(): BelongsTo
    {
        return $this->belongsTo(Ubicacion::class);
    }

    public function productoProveedores(): HasMany
    {
        return $this->hasMany(ProductoProveedor::class);
    }

    public static function createFolio(string $nombre): string
    {
        return strtoupper(Str::limit(preg_replace('/[^A-Za-z]/', '', $nombre), 3, '')).'-'
            .str_pad(mt_rand(0, 99999), 5, '0', STR_PAD_LEFT)
            .'-'.Date::now()->format('Ymd');
    }
}
