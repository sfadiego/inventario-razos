<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
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

    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'proveedor_categoria', 'proveedor_id', 'categoria_id');
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('nombre', 'like', "%$search%");
    }
}
