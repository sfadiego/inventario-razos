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
        Schema::create('error_reporting', function (Blueprint $table) {
            $table->id();
            $table->string('endpoint');
            $table->string('method', 10);
            $table->integer('status_code');
            $table->text('error_message');
            $table->json('request_payload')->nullable();
            $table->json('response_body')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('error_reporting');
    }
};
