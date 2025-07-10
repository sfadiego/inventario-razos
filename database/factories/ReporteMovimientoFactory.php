<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\TipoMovimiento;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReporteMovimientoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::inRandomOrder()->value('id'),
            'tipo_movimiento_id' => TipoMovimiento::inRandomOrder()->value('id'),
            'motivo' => $this->faker->text(50),
            'cantidad' => $this->faker->randomNumber(2),
            'cantidad_anterior' => $this->faker->randomNumber(2),
            'cantidad_actual' => $this->faker->randomNumber(2),
            'user_id' => User::inRandomOrder()->value('id'),
            'fecha_movimiento' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
