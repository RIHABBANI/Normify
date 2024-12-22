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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conformity_id')->constrained('conformities')->references('id')->onDelete('cascade')->onUpdate('restrict');
            $table->string('action_title', 255);
            $table->string('action_description', 255)->nullable();
            $table->date('action_start_date');
            $table->date('action_end_date');
            $table->enum('action_status', ['En cours', 'Terminée', 'En attente']);
            $table->enum('action_priority', ['Haute', 'Moyenne', 'Basse']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
