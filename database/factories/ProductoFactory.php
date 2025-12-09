<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Marca;
use App\Models\Proveedor;
use App\Models\Subcategoria;
use App\Models\Ubicacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->unique()->word,
            'proveedor_id' => Proveedor::firstOrCreate(['nombre' => $this->faker->company])->id,
            'categoria_id' => Categoria::inRandomOrder()->value('id'),
            'subcategoria_id' => Subcategoria::factory()->create()->id,
            'codigo' => strtoupper($this->faker->unique()->bothify('????-#####')),
            'precio_compra' => $this->faker->randomFloat(2, 10, 100),
            'precio_venta' => $this->faker->randomFloat(2, 20, 200),
            'stock' => $this->faker->numberBetween(1, 100),
            'cantidad_minima' => $this->faker->numberBetween(1, 10),
            'compatibilidad' => $this->faker->text(50),
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $this->faker->word])->id,
            'marca_id' => Marca::firstOrCreate(['nombre' => $this->faker->word])->id,
            'activo' => $this->faker->boolean,
            'unidad' => $this->faker->randomElement(['pieza', 'metro', 'par']),
        ];
    }
}
