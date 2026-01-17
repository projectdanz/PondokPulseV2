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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('team_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('jobDesk_id')->nullable()->constrained('jobDesks')->nullOnDelete();
            $table->date('birth_date')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('parent_phone_number')->nullable();
            $table->string('gender')->nullable();
            $table->string('address')->nullable();
            $table->string('profile_link')->nullable();
            $table->integer('join_year')->nullable();
            $table->integer('exit_year')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
