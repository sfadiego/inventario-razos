<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\HistorialAdeudo;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\Factory;

class HistorialAdeudoFactory extends Factory
{
    protected $model = HistorialAdeudo::class;

    public function definition(): array
    {
        return [
            'pagado' => false,
            'total_adeudo' => $this->faker->numberBetween(100, 1000),
            'cliente_id' => Cliente::factory(),
            'venta_id' => Venta::factory(),
        ];
    }
}
