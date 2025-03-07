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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100)->notNullable();
            $table->foreignId('proveedor_id')->constrained('proveedores')->onDelete('cascade');
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');
            $table->string('codigo', 200)->notNullable()->unique();
            $table->decimal('precio_compra', 10,2)->default(0);
            $table->decimal('precio_venta', 10,2)->default(0);
            $table->unsignedInteger('stock')->default(0);
            $table->unsignedInteger('cantidad_minima')->default(0);
            $table->string('compatibilidad')->nullable();
            $table->foreignId('ubicacion_id')->nullable()->constrained("ubicaciones");
            $table->tinyInteger('activo')->default(1)->notNullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
