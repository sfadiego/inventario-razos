<?php

namespace Tests\Feature\VentaProducto;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use App\Models\Venta;
use Tests\TestCase;

class VentaProductoTest extends TestCase
{
    // test faltantes
    // test quitar/agregar productos de carrito de compra
        // validar que el total se actualice
    // test finalizar venta

    public function test_agregar_producto_venta(): void
    {
        $this->loginAdmin();
        // crear venta
        $venta = Venta::factory()->create();
        $producto = Producto::factory()->create([
            'nombre' => $this->faker->word,
            'proveedor_id' => Proveedor::factory()->create()->id,
            'categoria_id' => Categoria::first()->id,
            'codigo' => strtoupper($this->faker->unique()->bothify('????-#####')),
            'precio_compra' => $this->faker->randomFloat(2, 10, 100),
            'precio_venta' => $this->faker->randomFloat(2, 20, 200),
            'stock' => 10,
            'cantidad_minima' => $this->faker->numberBetween(1, 10),
            'compatibilidad' => $this->faker->text(50),
            'ubicacion_id' => Ubicacion::factory()->create()->id,
            'activo' => $this->faker->boolean,
        ]);

        $payload = [
            'cantidad' => 9,
            'precio' => 100,
            'producto_id' => $producto->id,
            'venta_id' => $venta->id,
        ];
        $response = $this->post('/api/venta-producto', $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'cantidad' => $payload['cantidad'],
                'precio' => $payload['precio'],
                'producto_id' => $payload['producto_id'],
                'venta_id' => $payload['venta_id'],
            ],
        ]);
    }

    public function test_insuficiente_stock(): void
    {
        $this->withExceptionHandling();
        $this->loginAdmin();
        // crear venta
        $venta = Venta::factory()->create();
        $producto = Producto::factory()->create([
            'nombre' => $this->faker->word,
            'proveedor_id' => Proveedor::factory()->create()->id,
            'categoria_id' => Categoria::first()->id,
            'codigo' => strtoupper($this->faker->unique()->bothify('????-#####')),
            'precio_compra' => $this->faker->randomFloat(2, 10, 100),
            'precio_venta' => $this->faker->randomFloat(2, 20, 200),
            'stock' => 10,
            'cantidad_minima' => $this->faker->numberBetween(1, 10),
            'compatibilidad' => $this->faker->text(50),
            'ubicacion_id' => Ubicacion::factory()->create()->id,
            'activo' => $this->faker->boolean,
        ]);

        $payload = [
            'cantidad' => 20,
            'precio' => 100,
            'producto_id' => $producto->id,
            'venta_id' => $venta->id,
        ];
        $response = $this->post('/api/venta-producto', $payload);

        $response->assertStatus(422);
        $response->assertJson([
            'status' => 'error',
            'message' => 'No hay suficiente stock del producto seleccionado.',
            'data' => null,
        ]);
    }

    // valida total sea igual a productos agregados
    // valida listado de productos a venta
}
