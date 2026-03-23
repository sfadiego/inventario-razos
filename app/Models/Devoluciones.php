<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Devoluciones extends Model
{
    protected $table = 'devoluciones';

    protected $fillable = ['total_reembolsado', 'motivo', 'venta_id', 'status'];

    public function detalle(): HasMany
    {
        return $this->hasMany(DetalleDevolucion::class, 'devolucion_id', 'id');
    }

    public function venta(): BelongsTo
    {
        return $this->belongsTo(Venta::class, 'venta_id', 'id');
    }
}
