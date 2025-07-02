<?php

namespace Database\Factories;

use App\Models\Cliente;
use Illuminate\Database\Eloquent\Factories\Factory;

class VentaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'venta_total' => $this->faker->randomFloat(2, 0, 1000),
            'nombre_venta' => $this->faker->name,
            'folio' => strtoupper($this->faker->unique()->bothify('????-#####')),
            'cliente_id' => Cliente::inRandomOrder()->value('id'),
            'tipo_compra' => $this->faker->randomElement(['credito', 'contado']),
            'status_venta' => $this->faker->randomElement(['activa', 'finalizada']),
        ];
    }
}
