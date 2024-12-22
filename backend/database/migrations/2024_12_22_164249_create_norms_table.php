<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('norms', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('norm_ref');
            $table->string('norm_abbreviation_name');
            $table->string('norm_complet_name');
            $table->string('norm_version')->nullable();
            $table->string('norm_pub_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('norms');
    }
};
