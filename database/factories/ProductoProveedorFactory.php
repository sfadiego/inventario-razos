<?php

namespace Database\Factories;

use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductoProveedor>
 */
class ProductoProveedorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'proveedor_id' => Proveedor::inRandomOrder()->value('id'),
            'producto_id' => Producto::inRandomOrder()->value('id'),
        ];
    }
}
