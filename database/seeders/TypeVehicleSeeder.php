<?php

namespace Database\Seeders;

use App\Models\TypeVehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeVehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeVehicle::create(['name' => "Automóvil"]);
        TypeVehicle::create(['name' => "Motocicleta"]);
    }
}
