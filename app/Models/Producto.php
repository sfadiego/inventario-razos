<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = ['nombre', 'proveedor_id', 'categoria_id', 'codigo', 'precio_compra', 'precio_venta', 'stock', 'cantidad_minima', 'compatibilidad', 'ubicacion_id', 'activo'];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class);
    }
    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
    public function ubicacion()
    {
        return $this->belongsTo(Ubicacion::class);
    }
}
