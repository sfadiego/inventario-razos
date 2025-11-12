<?php

namespace Tests\Feature\Venta;

use App\Enums\StatusVentaEnum;
use App\Enums\TipoCompraEnum;
use App\Models\Categoria;
use App\Models\Cliente;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class VentaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_venta(): void
    {
        $this->loginAdmin();
        // crear venta
        Venta::factory()->count(10)->create();

        // fetch data
        $response = $this->get('/api/ventas');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'venta_total',
                    'nombre_venta',
                    'folio',
                    'cliente_id',
                    'tipo_compra',
                    'status_venta',
                ],
            ],
        ]);

        $this->assertDatabaseCount('venta', 10);
        Venta::all()->each(function ($venta) {
            $this->assertDatabaseHas('venta', [
                'id' => $venta->id,
                'folio' => $venta->folio,
            ]);
        });
    }

    public function test_store_venta(): void
    {
        $this->loginAdmin();

        // crear venta
        $payload = [
            'venta_total' => 0,
            'folio' => Producto::createFolio($this->faker->word),
            'nombre_venta' => $this->faker->word,
            'cliente_id' => Cliente::factory()->create()->id,
            'tipo_compra' => TipoCompraEnum::Contado->value,
            'status_venta' => StatusVentaEnum::Activa->value,

        ];

        $response = $this->post('/api/ventas', $payload);
        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'venta_total' => $payload['venta_total'],
                'nombre_venta' => $payload['nombre_venta'],
                'cliente_id' => $payload['cliente_id'],
                'tipo_compra' => $payload['tipo_compra'],
                'status_venta' => $payload['status_venta'],
            ],
        ]);
        $response->json('data');
        $this->assertDatabaseHas('venta', [
            'id' => $response->json('data.id'),
            'folio' => $response->json('data.folio'),
        ]);
    }

    public function test_show_venta(): void
    {
        $this->loginAdmin();

        $venta = Venta::factory()->create();

        $response = $this->get("/api/ventas/{$venta->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'venta_total',
                'nombre_venta',
                'folio',
                'cliente_id',
                'tipo_compra',
                'status_venta',
                'created_at',
                'updated_at',
                'cliente',
            ],
        ]);

        $this->assertDatabaseHas('venta', [
            'id' => $venta->id,

        ]);
    }

    public function test_finalizar_venta(): void
    {
        $this->loginAdmin();

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
            'unidad' => $this->faker->randomElement(['pieza', 'metro', 'par']),
            'activo' => $this->faker->boolean,
        ]);

        VentaProducto::factory()->create([
            'cantidad' => 5,
            'precio' => $producto->precio_venta,
            'producto_id' => $producto->id,
            'venta_id' => $venta->id,
        ]);

        $response = $this->put("/api/ventas/{$venta->id}/finalizar-venta");
        $response->assertStatus(200);
        $data = $response->json('data');
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $venta['id'],
                'venta_total' => $venta->ventaTotal(),
                'nombre_venta' => $venta['nombre_venta'],
                'folio' => $venta['folio'],
                'cliente_id' => $venta['cliente_id'],
                'tipo_compra' => $venta['tipo_compra'],
                'status_venta' => StatusVentaEnum::Finalizada->value,
            ],
        ]);

        $this->assertEquals($data['venta_total'], $venta->ventaTotal());
        $this->assertDatabaseHas('venta', [
            'id' => $venta->id,
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'folio' => $venta->folio,
        ]);
    }
}
