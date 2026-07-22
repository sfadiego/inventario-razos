<?php

namespace Tests\Feature\Devoluciones;

use App\Enums\TipoMovimientoEnum;
use App\Models\Devoluciones;
use App\Models\Producto;
use App\Models\ReporteMovimiento;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class DevolucionesTest extends TestCase
{
    public function test_index_devoluciones(): void
    {
        $this->loginAdmin();

        $venta = Venta::factory()->create();
        Devoluciones::factory()->create(['venta_id' => $venta->id]);

        $response = $this->get('/api/devoluciones');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'id',
                    'folio',
                    'nombre_venta',
                    'devolucion',
                ],
            ],
        ]);
    }

    public function test_show_devoluciones(): void
    {
        $this->loginAdmin();

        $devolucion = Devoluciones::factory()->create();

        $response = $this->getJson("/api/devoluciones/{$devolucion->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'id',
                    'motivo',
                    'total_reembolsado',
                    'venta',
                    'detalle',
                ],
            ]);
    }

    public function test_show_by_venta(): void
    {
        $this->loginAdmin();

        $venta = Venta::factory()->create();
        $devolucion = Devoluciones::factory()->create(['venta_id' => $venta->id]);

        $response = $this->getJson("/api/devoluciones/by-venta/{$venta->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'id',
                    'devolucion_id',
                    'folio',
                ],
            ]);
    }

    public function test_store_devolucion(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create(['stock' => 10]);
        $venta = Venta::factory()->create();

        VentaProducto::factory()->create([
            'venta_id' => $venta->id,
            'producto_id' => $producto->id,
            'cantidad' => 5,
            'precio' => 100,
        ]);

        $payload = [
            'venta_id' => $venta->id,
            'motivo' => 'Producto defectuoso',
            'productos' => [
                [
                    'producto_id' => $producto->id,
                    'cantidad' => 2,
                    'precio_unitario' => 100,
                ],
            ],
        ];

        $response = $this->postJson('/api/devoluciones', $payload);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'id',
                    'motivo',
                    'total_reembolsado',
                ],
            ]);

        $this->assertEquals(12, $producto->fresh()->stock);

        $reporteMovimiento = ReporteMovimiento::where('producto_id', $producto->id)
            ->where('tipo_movimiento_id', TipoMovimientoEnum::DEVOLUCION->value)
            ->first();

        $this->assertNotNull($reporteMovimiento);
        $this->assertEquals(2, $reporteMovimiento->cantidad);
    }

    public function test_store_devolucion_with_invalid_products(): void
    {
        $this->loginAdmin();

        $producto1 = Producto::factory()->create();
        $producto2 = Producto::factory()->create();
        $venta = Venta::factory()->create();

        VentaProducto::factory()->create([
            'venta_id' => $venta->id,
            'producto_id' => $producto1->id,
            'precio' => 100,
        ]);

        $payload = [
            'venta_id' => $venta->id,
            'motivo' => 'Producto defectuoso',
            'productos' => [
                [
                    'producto_id' => $producto2->id,
                    'cantidad' => 1,
                    'precio_unitario' => 100,
                ],
            ],
        ];

        $response = $this->postJson('/api/devoluciones', $payload);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'No es una devolucion válida',
            ]);
    }
}
