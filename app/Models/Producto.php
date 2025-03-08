<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = ['nombre','proveedor_id','categoria_id', 'codigo', 'precio_compra', 'precio_venta','stock','cantidad_minima','compatibilidad','ubicacion_id','activo'];
}
