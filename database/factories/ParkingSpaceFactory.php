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
        $status = $this->faker->boolean(); // true (ocupado) o false (libre)

        return [
            'status' => $status,
            'type_vehicle_id' => $status ? TypeVehicle::inRandomOrder()->first()?->id : null,
            'number' => $this->faker->unique()->bothify('P-###'), // Genera un número de espacio tipo "P-123"
            'license_plate' => $status ? strtoupper($this->faker->bothify('???-###')) : null, // Genera una placa tipo "ABC-123"
            'driver' => $status ? $this->faker->name() : null,
        ];
    }
}
