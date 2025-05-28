<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('venta', function (Blueprint $table) {
            $table->id();
            $table->decimal('venta_total', 10, 2);
            $table->string('nombre_venta');
            $table->foreignId('cliente_id')
                ->nullable()
                ->constrained('clientes')
                ->onDelete('cascade');
            $table->enum('tipo_compra', ['credito', 'contado']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('venta');
    }
};
