<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id('ID_UTILISATEUR');
            $table->string('NOM_UTILISATEUR', 50);
            $table->string('MOT_DE_PASSE_UTILISATEUR', 225);
            $table->string('ROLE_UTILISATEUR', 225);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('utilisateurs');
    }
};