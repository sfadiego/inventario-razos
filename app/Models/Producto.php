<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
}
