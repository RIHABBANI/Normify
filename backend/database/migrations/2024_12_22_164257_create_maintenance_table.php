<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ID_PANNE')->constrained('pannes', 'id');
            $table->foreignId('ID_UTILISATEUR')->constrained('users', 'id');
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