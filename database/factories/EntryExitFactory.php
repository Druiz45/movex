<?php

namespace Database\Factories;

use App\Models\ParkingSpace;
use App\Models\Rate;
use App\Models\TypeVehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EntryExit>
 */
class EntryExitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Precio actual
        $price = Rate::first();

        // Obtener un espacio de estacionamiento aleatorio
        $parkingSpace = ParkingSpace::inRandomOrder()->first() ?? ParkingSpace::factory();

        // Generar la hora de entrada y salida con lógica válida
        $entry = $this->faker->dateTimeBetween('-1 month', 'now'); // Entrada en el último mes
        $departure = (clone $entry)->modify('+' . $this->faker->numberBetween(1, 8) . ' hours'); // Salida entre 1 y 8 horas después

        return [
            'parking_space_id' => $parkingSpace->id,
            'type_vehicle_id' => TypeVehicle::inRandomOrder()->first(),
            'license_plate' => strtoupper($this->faker->bothify('???-###')), // Placa tipo "ABC-123"
            'driver' => $this->faker->name(),
            'entry' => $entry,
            'departure' => $departure,
            'hourly_price_to_date' => $price->price_hour, // Precio por hora entre 5 y 50
            // 'hourly_price_to_date' => $this->faker->randomFloat(2, 5, 50), // Precio por hora entre 5 y 50
        ];
    }
}
