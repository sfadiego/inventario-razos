<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('detalle_devolucion', function (Blueprint $table) {
            $table->id();
            $table->integer('cantidad');
            $table->integer('precio_unitario');
            $table->foreignId('devolucion_id')
                ->constrained('devoluciones')
                ->onDelete('cascade');
            $table->foreignId('producto_id')
                ->constrained('productos')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalle_devolucion');
    }
};
