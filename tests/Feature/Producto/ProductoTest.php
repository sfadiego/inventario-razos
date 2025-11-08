<?php

namespace Tests\Feature\Producto;

use App\Enums\TipoMovimientoEnum;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductoTest extends TestCase
{
    use WithFaker;

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

            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'links' => [
                '*' => ['url', 'label', 'page', 'active'],
            ],
            'next_page_url',
            'path',
            'per_page',
            'prev_page_url',
            'to',
            'total',
            'columns' => [
                '*' => ['accessor', 'title'],
            ],
        ]);

        $response->assertJsonCount(10, 'data');
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

        $productoId = $response->json('data.id');

        $this->assertDatabaseHas('reporte_movimientos', [
            'producto_id' => $productoId,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'cantidad_anterior' => 0,
            'cantidad_actual' => $payload['stock'],
        ]);
    }

    public function test_store_producto_image(): void
    {
        $this->loginAdmin();

        Storage::fake('local');

        $proveedor = Proveedor::factory()->create();
        $categoria = Categoria::factory()->create();
        $ubicacion = Ubicacion::factory()->create();

        $file = UploadedFile::fake()->image('image.jpg');

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
            'file' => $file,
        ];

        $response = $this->post('/api/productos', $payload);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'imagen' => [
                    'id',
                    'archivo',
                    'path',
                    'external',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);

        Storage::disk('local')->assertExists(
            $response->json('data.imagen.path').'/'.$response->json('data.imagen.archivo')
        );

        $this->assertDatabaseHas('imagen_producto', [
            'id' => $response->json('data.imagen.id'),
        ]);
    }

    public function test_update_producto_(): void
    {
        $this->loginAdmin();

        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();

        $producto = Producto::factory()->create([
            'proveedor_id' => Proveedor::first()->id,
            'categoria_id' => Categoria::first()->id,
            'ubicacion_id' => Ubicacion::first()->id,
        ]);

        $payload = [
            'nombre' => $this->faker->unique()->word,
            'proveedor_id' => $producto->proveedor_id,
            'categoria_id' => $producto->categoria_id,
            'precio_compra' => $this->faker->randomFloat(2, 1, 100),
            'precio_venta' => $this->faker->randomFloat(2, 1, 100),
            'stock' => $this->faker->numberBetween(0, 100),
            'cantidad_minima' => $this->faker->numberBetween(1, 10),
            'compatibilidad' => $this->faker->word,
            'ubicacion_id' => $producto->ubicacion_id,
            'activo' => $this->faker->boolean,
            'imagen_id' => null,
            'unidad' => $this->faker->randomElement(['pieza', 'metro', 'par']),
        ];

        $response = $this->post("/api/productos/{$producto->id}", $payload);

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

    public function test_update_producto_solo_actualiza_datos()
    {
        $this->loginAdmin();

        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();

        $producto = Producto::factory()->create();

        $data = [
            'nombre' => 'test nombre',
        ];

        $response = $this->post("/api/productos/{$producto->id}", $data);

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'OK',
                'data' => [
                    'nombre' => 'test nombre',
                    'proveedor_id' => $producto->proveedor_id,
                    'categoria_id' => $producto->categoria_id,
                    'precio_compra' => $producto->precio_compra,
                    'precio_venta' => $producto->precio_venta,
                ],
            ]);

        $this->assertDatabaseCount('reporte_movimientos', 0);

        $this->assertDatabaseHas('productos', [
            'id' => $producto->id,
            'nombre' => 'test nombre',
        ]);
    }

    public function test_update_producto_image(): void
    {
        $this->loginAdmin();

        Storage::fake('local');

        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();

        $producto = Producto::factory()->create([
            'proveedor_id' => Proveedor::first()->id,
            'categoria_id' => Categoria::first()->id,
            'ubicacion_id' => Ubicacion::first()->id,
        ]);

        $file = UploadedFile::fake()->image('new_image.jpg');

        $payload = [
            'file' => $file,
        ];

        $response = $this->post("/api/productos/{$producto->id}", $payload);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'imagen' => [
                    'id',
                    'archivo',
                    'path',
                    'external',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);

        Storage::disk('local')->assertExists(
            $response->json('data.imagen.path').'/'.$response->json('data.imagen.archivo')
        );

        $this->assertDatabaseHas('imagen_producto', [
            'id' => $response->json('data.imagen.id'),
        ]);

        $this->assertDatabaseHas('productos', [
            'id' => $producto->id,
            'imagen_id' => $response->json('data.imagen.id'),
        ]);
    }

    public function test_delete_producto(): void
    {

        Proveedor::factory()->create();
        Categoria::factory()->create();
        Ubicacion::factory()->create();
        $producto = Producto::factory()->create();

        $this->loginAdmin();

        $response = $this->delete("/api/productos/{$producto->id}");
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => 'Producto eliminado correctamente',
            'data' => false,
        ]);

        $this->assertDatabaseHas('productos', [
            'id' => $producto->id,
            'activo' => false,
        ]);
    }
}
