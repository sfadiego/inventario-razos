<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialAdeudo extends Model
{
    protected $table = 'historial_adeudo_cliente';
    protected $fillable = [
        'pagado',
        'total_adeudo',
        'cliente_id',
        'venta_id',
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
