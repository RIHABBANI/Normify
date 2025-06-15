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
            $table->date('DATE_MAINTENANCE');
            $table->text('SIGNALEMENT_MAINTENANCE');
            $table->text('ANOMALIE_MAINTENANCE');
            $table->string('ORGANE_MAINTENANCE');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenances');
    }
};