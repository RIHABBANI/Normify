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
        
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('NOM_UTILISATEUR', 50);
            $table->string('PRENOM_UTILISATEUR', 50);
            $table->string('NUMERO_TELEPHONE', 50);
            
            $table->string('email', 255)->unique();
            $table->string('password', 225);
            $table->string('ROLE_UTILISATEUR', 225);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
