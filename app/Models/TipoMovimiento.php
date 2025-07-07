<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoMovimiento extends Model
{
    use HasFactory;

    protected $table = 'tipo_movimientos';

    public $timestamps = false;

    protected $fillable = [
        'id',
        'nombre',
    ];

    public function reporteMovimientos(): HasMany
    {
        return $this->hasMany(ReporteMovimiento::class);
    }
}
