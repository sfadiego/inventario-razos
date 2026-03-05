<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Marca extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'marcas';

    protected $fillable = ['nombre'];

    const SIN_DEFINIR = 'Sin definir';

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where('nombre', 'like', "%$search%");
    }
}
