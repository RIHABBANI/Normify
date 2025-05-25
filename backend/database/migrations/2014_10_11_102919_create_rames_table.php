<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rames', function (Blueprint $table) {
            $table->id();
            $table->string('NUMERO_RAME', 20);
            $table->string('TYPE_RAME', 20);
            $table->string('PARTIE_RAME', 50);
            $table->date('DERNIERE_MAINTENANCE')->nullable();
            $table->date('PROCHAINE_MAINTENANCE')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rames');
    }
};