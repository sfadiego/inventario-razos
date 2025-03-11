<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VentaProducto extends Model
{
    protected $table = 'venta_producto';
    protected $fillables = ['producto_id', 'cantidad', 'precio', 'tipo_compra'];
}
