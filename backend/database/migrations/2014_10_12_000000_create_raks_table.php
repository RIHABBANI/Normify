<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('raks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ID_RAME')->constrained('rames', 'id');
            $table->string('NOM_RAK', 50);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('raks');
    }
};