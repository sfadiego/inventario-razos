<?php

namespace Database\Factories;

use App\Enums\TipoMovimientoEnum;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReporteMovimientoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'producto_id' => Producto::inRandomOrder()->value('id'),
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'motivo' => '',
            'cantidad' => $this->faker->randomNumber(2),
            'cantidad_anterior' => 0,
            'cantidad_actual' => $this->faker->randomNumber(2),
            'user_id' => User::inRandomOrder()->value('id'),
            'created_at' => now(),
        ];
    }
}
