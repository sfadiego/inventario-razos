<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReporteMovimiento extends Model
{
    use HasFactory;

    protected $table = 'reporte_movimientos';

    public $timestamps = false;

    protected $fillable = [
        'producto_id',
        'tipo_movimiento_id',
        'motivo',
        'cantidad',
        'cantidad_anterior',
        'cantidad_actual',
        'user_id',
        'fecha_movimiento',
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class);
    }

    public function tipoMovimiento(): BelongsTo
    {
        return $this->belongsTo(TipoMovimiento::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
