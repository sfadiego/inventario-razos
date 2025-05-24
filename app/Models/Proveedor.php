<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Proveedor extends Model
{
    use HasFactory;

    protected $table = 'proveedores';

    protected $fillable = ['nombre', 'empresa', 'observaciones'];

    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class);
    }

    public function productoProveedores(): HasMany
    {
        return $this->hasMany(ProductoProveedor::class);
    }
}
