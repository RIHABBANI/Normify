<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('subirs', function (Blueprint $table) {
            $table->foreignId('ID_CARTE')->constrained('cartes', 'ID_CARTE');
            $table->foreignId('ID_PANNE')->constrained('pannes', 'ID_PANNE');
            $table->primary(['ID_CARTE', 'ID_PANNE']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('subirs');
    }
};