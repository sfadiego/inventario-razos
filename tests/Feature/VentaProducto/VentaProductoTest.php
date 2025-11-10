<?php

namespace Tests\Feature\VentaProducto;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class VentaProductoTest extends TestCase
{
    public function test_agregar_producto_a_venta(): void
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
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $this->faker->unique()->word])->id,
            'activo' => $this->faker->boolean,
        ]);

        $payload = [
            'cantidad' => 9,
            'precio' => $producto->precio_venta,
            'producto_id' => $producto->id,
            'venta_id' => $venta->id,
        ];
        $response = $this->post('/api/venta-producto', $payload);
        $total = $producto->precio_venta * $payload['cantidad'];
        $this->assertDatabaseHas('venta', [
            'id' => $venta->id,
            'venta_total' => $total,
        ]);
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

        $this->assertDatabaseHas('venta_producto', [
            'venta_id' => $venta->id,
            'producto_id' => $producto->id,
            'cantidad' => $payload['cantidad'],
        ]);

        $this->assertDatabaseHas('venta', [
            'id' => $venta->id,
            'venta_total' => $producto->precio_venta * $payload['cantidad'],
        ]);
    }

    public function test_insuficiente_stock_producto(): void
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
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $this->faker->unique()->word])->id,
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

    public function test_restar_producto_carrito(): void
    {
        $this->loginAdmin();
        $venta = Venta::factory()->create();
        $producto = Producto::factory()->create([
            'nombre' => $this->faker->unique()->word,
            'proveedor_id' => Proveedor::factory()->create()->id,
            'categoria_id' => Categoria::first()->id,
            'codigo' => strtoupper($this->faker->unique()->bothify('????-#####')),
            'precio_compra' => $this->faker->randomFloat(2, 10, 100),
            'precio_venta' => $this->faker->randomFloat(2, 20, 200),
            'stock' => 10,
            'cantidad_minima' => $this->faker->numberBetween(1, 10),
            'compatibilidad' => $this->faker->text(50),
            'ubicacion_id' => Ubicacion::firstOrCreate(['nombre' => $this->faker->unique()->word])->id,
            'activo' => $this->faker->boolean,
        ]);

        $ventaProducto = VentaProducto::factory()->create([
            'cantidad' => 8,
            'precio' => $producto->precio_venta,
            'producto_id' => $producto->id,
            'venta_id' => $venta->id,
        ]);

        $this->assertDatabaseHas('venta_producto', [
            'venta_id' => $venta->id,
            'producto_id' => $producto->id,
            'cantidad' => 8,
        ]);

        $payload = [
            'cantidad' => 5,
            'precio' => $producto->precio_venta,
            'producto_id' => $producto->id,
        ];
        $response = $this->put("/api/venta-producto/{$ventaProducto->id}", $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'cantidad' => $payload['cantidad'],
                'precio' => $producto->precio_venta,
                'producto_id' => $producto->id,
                'venta_id' => $venta->id,
            ],
        ]);

        $this->assertDatabaseHas('venta_producto', [
            'venta_id' => $venta->id,
            'producto_id' => $producto->id,
            'cantidad' => $payload['cantidad'],
        ]);

        $this->assertDatabaseHas('venta', [
            'id' => $venta->id,
            'venta_total' => $producto->precio_venta * $payload['cantidad'],
        ]);
    }
}
