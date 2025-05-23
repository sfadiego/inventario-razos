<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (! Schema::hasTable('producto_proveedor')) {
            Schema::create('producto_proveedor', function (Blueprint $table) {
                $table->id();
                $table->foreignId('proveedor_id')->constrained('proveedores')->onDelete('cascade');
                $table->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_proveedor');
    }
};
