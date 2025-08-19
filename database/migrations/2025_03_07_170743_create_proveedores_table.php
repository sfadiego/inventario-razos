<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('proveedores')) {
            Schema::create('proveedores', function (Blueprint $table) {
                $table->id();
                $table->string('nombre');
                $table->string('empresa')->nullable(); // TODO: validar o borrar
                $table->text('observaciones')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
