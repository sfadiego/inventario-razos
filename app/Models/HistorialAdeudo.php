<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialAdeudo extends Model
{
    use HasFactory;

    protected $table = 'historial_adeudo_cliente';

    protected $fillable = [
        'pagado',
        'total_adeudo',
        'cliente_id',
        'venta_id',
    ];

    protected $casts = [
        'pagado' => 'boolean',
    ];

    public function cliente()
    {
        return $this->hasOne(Cliente::class, 'id', 'cliente_id');
    }

    public function venta()
    {
        return $this->hasOne(Venta::class, 'id', 'venta_id');
    }
}
