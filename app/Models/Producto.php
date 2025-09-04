<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = ['nombre', 'proveedor_id', 'categoria_id', 'codigo', 'precio_compra', 'precio_venta', 'stock', 'cantidad_minima', 'compatibilidad', 'ubicacion_id', 'activo', 'imagen_id', 'unidad'];

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

    public function ventaProductos(): HasMany
    {
        return $this->hasMany(VentaProducto::class);
    }

    public function tipoMovimientos(): HasMany
    {
        return $this->hasMany(TipoMovimiento::class);
    }

    public static function createFolio(string $nombre): string
    {
        $letras = strtoupper(Str::substr(preg_replace('/[^A-Za-z]/', '', $nombre), 0, 4));
        $numeros = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
        $fecha = now()->format('ymd');

        return "{$letras}-{$numeros}-{$fecha}";
    }
}
