<?php

namespace Database\Factories;

use App\Models\TypeVehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ParkingSpace>
 */
class ParkingSpaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $contador = 1; // Empieza en 1 y se incrementa con cada llamada

        $status = $this->faker->boolean(); // true (ocupado) o false (libre)

        return [
            'status' => $status,
            'type_vehicle_id' => $status ? TypeVehicle::inRandomOrder()->first()?->id : null,
            'number' => $contador++, // número secuencial para el espacio
            'license_plate' => $status ? strtoupper($this->faker->bothify('???-###')) : null,
            'driver' => $status ? $this->faker->name() : null,
            'entry' => now()
        ];
    }
}
