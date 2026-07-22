<?php

namespace Database\Factories;

use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\Factory;

class DevolucionesFactory extends Factory
{
    public function definition(): array
    {
        return [
            'motivo' => $this->faker->sentence(),
            'total_reembolsado' => $this->faker->randomFloat(2, 0, 1000),
            'venta_id' => Venta::factory(),
        ];
    }
}
