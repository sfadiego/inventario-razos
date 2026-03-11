<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Devoluciones extends Model
{
    protected $table = 'devoluciones';

    protected $fillable = ['total_reembolsado', 'motivo', 'venta_id'];

    public function detalle()
    {
        return $this->hasMany(DetalleDevolucion::class, 'devolucion_id', 'id');
    }

    public function venta()
    {
        return $this->hasOne(Venta::class, 'id', 'venta_id');
    }
}
