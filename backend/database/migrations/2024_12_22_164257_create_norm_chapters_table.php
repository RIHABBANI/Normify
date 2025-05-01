<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id('ID_MAINTENANCE');
            $table->foreignId('ID_PANNE')->constrained('pannes', 'ID_PANNE');
            $table->foreignId('ID_UTILISATEUR')->constrained('utilisateurs', 'ID_UTILISATEUR');
            $table->string('TYPE_MAINTENANCE', 50);
            $table->date('DATE_MAINTENACE');
            $table->string('TYPE_OPERATION', 225);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenances');
    }
};