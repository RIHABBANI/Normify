<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('interventions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ID_PANNE')->constrained('pannes', 'id');
            $table->foreignId('ID_UTILISATEUR')->constrained('users', 'id');
            $table->date('DATE_INTERVENTION');
            $table->string('ACTION_EFFECTUEE_INTERVENTION', 225);
            $table->integer('DUREE_INTERVENTION');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('interventions');
    }
};