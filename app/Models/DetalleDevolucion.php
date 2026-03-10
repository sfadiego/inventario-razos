<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetalleDevolucion extends Model
{
    protected $table = 'detalle_devolucion';

    protected $fillable = ['cantidad', 'precio_unitario', 'devolucion_id', 'producto_id'];

    public function devolucion()
    {
        return $this->belongsTo(Devoluciones::class, 'devolucion_id', 'id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id', 'id');
    }
}
