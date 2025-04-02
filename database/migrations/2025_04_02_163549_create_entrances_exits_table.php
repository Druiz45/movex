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
        Schema::create('entrances_exits', function (Blueprint $table) {
            $table->id();
            $table->unsignedSmallInteger('parking_space_id');
            $table->string('license_plate', 10);
            $table->string('driver');
            $table->dateTime('entry');
            $table->dateTime('departure');
            $table->decimal('hourly_price_to_date', 10, 2);
            $table->timestamps();

            $table->foreign('parking_space_id')->references('id')->on('parking_spaces');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrances_exits');
    }
};
