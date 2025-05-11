<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cartes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ID_RAK')->constrained('raks', 'id');
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