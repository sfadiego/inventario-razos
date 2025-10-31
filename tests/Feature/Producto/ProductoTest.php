<?php

namespace Tests\Feature\Producto;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Enums\TipoMovimientoEnum;

class ProductoTest extends TestCase
{
    use WithFaker;
    #TODO:
    /* 
    * probar crud de productos
    * al probar con el crud de productos probar verifica que se registren valores en la tabla ReporteMovimiento
    * ejemplo en index:
    */
    public function test_index_producto(): void
    {
        $this->loginAdmin();
        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();
        Producto::factory()->count(10)->create();
        $response = $this->get('/api/productos');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'proveedor_id',
                    'categoria_id',
                    'codigo',
                    'precio_compra',
                    'precio_venta',
                    'stock',
                    'cantidad_minima',
                    'compatibilidad',
                    'ubicacion_id',
                    'activo',
                    'imagen_id',
                    'unidad',
                ],
            ],
        ]);
    }

    public function test_show_producto(): void
    {
        $this->loginAdmin();
        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();
        $producto = Producto::factory()->create();
        $response = $this->get("/api/productos/{$producto->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'proveedor_id',
                'categoria_id',
                'codigo',
                'precio_compra',
                'precio_venta',
                'stock',
                'cantidad_minima',
                'compatibilidad',
                'ubicacion_id',
                'activo',
                'imagen_id',
                'unidad',
            ],
        ]);
    }

    public function test_store_producto(): void
    {
        $this->loginAdmin();
        $proveedor = Proveedor::factory()->create();
        $categoria = Categoria::factory()->create();
        $ubicacion = Ubicacion::factory()->create();

        $payload = [
            'nombre' => $this->faker->unique()->word,
            'proveedor_id' => $proveedor->id,
            'categoria_id' => $categoria->id,
            'precio_compra' => $this->faker->randomFloat(2, 1, 100),
            'precio_venta' => $this->faker->randomFloat(2, 1, 100),
            'stock' => $this->faker->numberBetween(0, 100),
            'cantidad_minima' => $this->faker->numberBetween(0, 10),
            'compatibilidad' => $this->faker->word,
            'ubicacion_id' => $ubicacion->id,
            'activo' => $this->faker->boolean,
            'imagen_id' => null,
            'unidad' => $this->faker->randomElement(['pieza', 'metro', 'par']),
        ];

        $response = $this->post('/api/productos', $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'nombre' => $payload['nombre'],
                'proveedor_id' => $payload['proveedor_id'],
                'categoria_id' => $payload['categoria_id'],
                'precio_compra' => $payload['precio_compra'],
                'precio_venta' => $payload['precio_venta'],
                'stock' => $payload['stock'],
                'cantidad_minima' => $payload['cantidad_minima'],
                'compatibilidad' => $payload['compatibilidad'],
                'ubicacion_id' => $payload['ubicacion_id'],
                'activo' => $payload['activo'],
                'imagen_id' => $payload['imagen_id'],
                'unidad' => $payload['unidad'],
            ],
        ]);

        //TODO: verificar que se registre un movimiento de entrada, salida y ajuste
        // entrada == store
        // salida == al hacer ventas
        // ajuste al modificar stock
        
        // $this->assertDatabaseHas('reporte_movimientos', [
        //     'producto_id' => $response->json('data.id'),
        //     'tipo' => TipoMovimientoEnum::fromId(TipoMovimientoEnum::ENTRADA->value),
        // ]);
    }

    public function test_update_producto(): void
    {
        $this->loginAdmin();
        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();
        $producto = Producto::factory()->create();

        $payload = [
            'nombre' => $this->faker->unique()->word,
            'proveedor_id' => $producto->proveedor_id,
            'categoria_id' => $producto->categoria_id,
            'precio_compra' => $this->faker->randomFloat(2, 1, 100),
            'precio_venta' => $this->faker->randomFloat(2, 1, 100),
            'stock' => $this->faker->numberBetween(0, 100),
            'cantidad_minima' => $this->faker->numberBetween(0, 10),
            'compatibilidad' => $this->faker->word,
            'ubicacion_id' => $producto->ubicacion_id,
            'activo' => $this->faker->boolean,
            'imagen_id' => null,
            'unidad' => $this->faker->randomElement(['pieza', 'metro', 'par']),
        ];

        $response = $this->put("/api/productos/{$producto->id}", $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $producto->id,
                'nombre' => $payload['nombre'],
                'proveedor_id' => $payload['proveedor_id'],
                'categoria_id' => $payload['categoria_id'],
                'precio_compra' => $payload['precio_compra'],
                'precio_venta' => $payload['precio_venta'],
                'stock' => $payload['stock'],
                'cantidad_minima' => $payload['cantidad_minima'],
                'compatibilidad' => $payload['compatibilidad'],
                'ubicacion_id' => $payload['ubicacion_id'],
                'activo' => $payload['activo'],
                'imagen_id' => $payload['imagen_id'],
                'unidad' => $payload['unidad'],
            ],
        ]);
    }

    public function test_delete_producto(): void
    {
        $this->loginAdmin();
        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();
        $producto = Producto::factory()->create();

        $response = $this->delete("/api/productos/{$producto->id}");
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $producto->id,
            ],
        ]);
    }
}
