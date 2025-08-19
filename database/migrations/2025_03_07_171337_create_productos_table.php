<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('productos')) {
            Schema::create('productos', function (Blueprint $table) {
                $table->id();
                $table->string('nombre');
                $table->enum('unidad', ['pieza', 'metro', 'par']);
                $table->string('codigo', 18)->unique();
                $table->decimal('precio_compra', 10, 2);
                $table->decimal('precio_venta', 10, 2);
                $table->integer('stock');
                $table->integer('cantidad_minima');
                $table->text('compatibilidad')->nullable();
                $table->foreignId('imagen_id')
                    ->nullable()
                    ->constrained('imagen_producto')
                    ->onDelete('cascade');
                $table->foreignId('proveedor_id')
                    ->constrained('proveedores')
                    ->onDelete('cascade');
                $table->foreignId('categoria_id')
                    ->constrained('categorias')
                    ->onDelete('cascade');
                $table->foreignId('ubicacion_id')
                    ->constrained('ubicaciones')
                    ->onDelete('cascade');
                $table->boolean('activo')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
