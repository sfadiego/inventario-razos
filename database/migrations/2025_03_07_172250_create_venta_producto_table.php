<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    if (!Schema::hasTable('venta_producto')) {
        Schema::create('venta_producto', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            $table->integer('cantidad');
            $table->decimal('precio', 10, 2);
            $table->string('tipo_compra')->default('contado');
            $table->timestamps();
        });
    }
}

    public function down(): void
    {
        Schema::dropIfExists('venta_producto');
    }
};
