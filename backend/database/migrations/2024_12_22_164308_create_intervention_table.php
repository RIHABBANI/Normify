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
            $table->date('DATE_INTERVENTION');
            $table->string('MOTIF', 225);
            $table->text('TRAVAUX'); // Changed from integer to text to store detailed work descriptions
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('interventions');
    }
};