<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductoProveedor extends Model
{
    use HasFactory;

    protected $table = 'producto_proveedor';

    public $timestamps = false;

    protected $fillable = ['proveedor_id', 'producto_id'];
}
