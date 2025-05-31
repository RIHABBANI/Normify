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
        Schema::create('historique_cartes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ID_CARTE');
            $table->enum('STATUS', ['installee', 'retirée']);
            $table->timestamps();

            $table->foreign('ID_CARTE')->references('id')->on('cartes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historique_cartes');
    }
};
