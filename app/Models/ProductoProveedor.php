<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductoProveedor extends Model
{
    protected $table = 'producto_proveedor';

    protected $fillable = ['proveedor_id', 'producto_id'];
}
