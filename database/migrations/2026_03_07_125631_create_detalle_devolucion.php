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
            $table->decimal('cantidad', 10, 2);
            $table->decimal('precio_unitario', 10, 2);
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
