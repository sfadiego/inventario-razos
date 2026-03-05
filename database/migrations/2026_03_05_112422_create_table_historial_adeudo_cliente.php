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
        Schema::create('historial_adeudo_cliente', function (Blueprint $table) {
            $table->id();
            $table->boolean('pagado')->default(false);
            $table->decimal('total_adeudo', 10, 2)->default(0);
            $table->foreignId('cliente_id')
                ->constrained('clientes')
                ->onDelete('cascade');
            $table->foreignId('venta_id')
                ->constrained('venta')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_adeudo_cliente');
    }
};
