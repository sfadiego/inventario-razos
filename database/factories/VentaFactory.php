<?php

namespace Database\Factories;

use App\Enums\StatusVentaEnum;
use App\Enums\TipoCompraEnum;
use App\Models\Cliente;
use App\Models\Venta;
use App\Models\VentaProducto;
use Illuminate\Database\Eloquent\Factories\Factory;

class VentaFactory extends Factory
{
    public function definition(): array
    {
        return [
            'venta_total' => $this->faker->randomFloat(2, 0, 1000),
            'nombre_venta' => $this->faker->name,
            'folio' => $this->faker->unique()->numerify(date('ymdHis') . '##########'),
            'cliente_id' => Cliente::firstOrCreate(['nombre' => $this->faker->name])->id,
            'tipo_compra' => $this->faker->randomElement([TipoCompraEnum::Credito->value, TipoCompraEnum::Contado->value]),
            'status_venta' => $this->faker->randomElement([StatusVentaEnum::Activa->value, StatusVentaEnum::Finalizada->value]),
            'created_at' => $this->faker->dateTimeBetween('-10 months', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-10 months', 'now'),
        ];
    }

    public function withProductos($cantidad = 1)
    {
        return $this->has(VentaProducto::factory()
            ->count($cantidad), 'ventaProductos')
            ->afterCreating(function (Venta $venta) {
                $venta->update([
                    'venta_total' => $venta->ventaTotal(),
                ]);
            });
    }
}
