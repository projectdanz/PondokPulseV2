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
        Schema::create('kpis', function (Blueprint $table) {
            $table->id();
            $table->text('deskripsi');
            $table->unsignedTinyInteger('weight');
            $table->unsignedInteger('target');
            $table->unsignedInteger('achievement')->default(0);
            $table->unsignedSmallInteger('score')->default(0);
            $table->enum('status', ['failed', 'warning', 'achieved'])->default('failed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kpis');
    }
};
