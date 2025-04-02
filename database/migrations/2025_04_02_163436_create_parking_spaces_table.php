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
        Schema::create('parking_spaces', function (Blueprint $table) {
            $table->unsignedSmallInteger('id', true);
            $table->unsignedTinyInteger('type_vehicle_id')->nullable();
            $table->string('number', 10);
            $table->string('license_plate', 10)->nullable();
            $table->string('driver')->nullable();
            $table->boolean('status')->default(false);
            $table->timestamps();

            $table->foreign('type_vehicle_id')->references('id')->on('type_vehicles');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parking_spaces');
    }
};
