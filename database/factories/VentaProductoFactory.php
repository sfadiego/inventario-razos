<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Database\Eloquent\Factories\Factory;

class VentaProductoFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cantidad' => $this->faker->randomNumber(2),
            'precio' => $this->faker->randomFloat(2, 10, 100),
            'producto_id' => Producto::factory(),
            'venta_id' => Venta::factory(),
        ];
    }
}
