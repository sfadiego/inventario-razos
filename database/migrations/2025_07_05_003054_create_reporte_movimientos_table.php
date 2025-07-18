<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reporte_movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos');
            $table->foreignId('tipo_movimiento_id')->constrained('tipo_movimientos')->onDelete('cascade');
            $table->string('motivo')->nullable();
            $table->integer('cantidad');
            $table->integer('cantidad_anterior');
            $table->integer('cantidad_actual');
            $table->foreignId('user_id')->constrained('users');
            $table->dateTime('fecha_movimiento');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reporte_movimientos');
    }
};
