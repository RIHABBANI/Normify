<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('remplacement_cartes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ID_CARTE_ANCIENNE');
            $table->unsignedBigInteger('ID_CARTE_NOUVELLE');
            $table->date('DATE_REMPLACEMENT');
            $table->text('OBSERVATIONS')->nullable();
            $table->timestamps();

            $table->foreign('ID_CARTE_ANCIENNE')->references('id')->on('cartes')->onDelete('cascade');
            $table->foreign('ID_CARTE_NOUVELLE')->references('id')->on('cartes')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('remplacement_cartes');
    }
};
