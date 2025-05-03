<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pannes', function (Blueprint $table) {
            $table->id('ID_PANNE');
            $table->string('DESCRIPTION_PANNE', 225);
            $table->string('GRAVITE_PANNE', 225);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('pannes');
    }
};
