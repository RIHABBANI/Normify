<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rames', function (Blueprint $table) {
            $table->id('ID_RAME');
            $table->string('NUMERO_RAME', 20);
            $table->string('TYPE_RAME', 20);
            $table->date('DATE_MISE_EN_SERVICR_RAME');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rames');
    }
};