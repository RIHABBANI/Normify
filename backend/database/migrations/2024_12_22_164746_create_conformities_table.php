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
        Schema::create('conformities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exigency_id')->constrained('exigencies')->references('id')->onDelete('cascade')->onUpdate('restrict');
            $table->enum('conformity', ['conforme', 'Non conforme', 'Non conforme majeur', 'Non conforme mineur']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conformities');
    }
};
