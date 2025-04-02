<?php

namespace Database\Seeders;

use App\Models\EntryExit;
use App\Models\ParkingSpace;
use App\Models\User;
use Database\Factories\ParkingSpaceFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            RateSeeder::class,
            TypeVehicleSeeder::class,
        ]);

        ParkingSpace::factory()->count(21)->create();
        EntryExit::factory()->count(21)->create();
    }
}
