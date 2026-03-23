<?php

use App\Enums\StatusDevolucionEnum;
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
        Schema::create('devoluciones', function (Blueprint $table) {
            $table->id();
            $table->float('total_reembolsado')->default(0);
            $table->text('motivo')->nullable();
            $table->enum('status', [StatusDevolucionEnum::CREADA->value, StatusDevolucionEnum::CANCELADA->value])
                ->default(StatusDevolucionEnum::CREADA->value);
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
        Schema::dropIfExists('devoluciones');
    }
};
