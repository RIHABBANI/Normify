<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cartes', function (Blueprint $table) {
            $table->id('ID_CARTE');
            $table->foreignId('ID_RAK')->constrained('raks', 'ID_RAK');
            $table->string('REFERENCE_CARTE', 225);
            $table->string('STATU_CARTE', 50);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cartes');
    }
};