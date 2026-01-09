<?php

namespace Tests\Feature\ReporteMovimiento;

use App\Enums\TipoMovimientoEnum;
use App\Models\Producto;
use App\Models\ReporteMovimiento;
use App\Models\User;
use Tests\TestCase;

class ReporteMovimientoTest extends TestCase
{
    public function test_index_reporte_movimiento(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create();

        ReporteMovimiento::factory()->count(10)->create([
            'producto_id' => $producto->id,
        ]);

        $response = $this->get('/api/reporte-movimientos');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'producto_id',
                    'tipo_movimiento_id',
                    'cantidad',
                    'cantidad_anterior',
                    'cantidad_actual',
                    'user_id',
                    'created_at',
                ],
            ],
            'first_page_url',
            'last_page_url',
            'per_page',
            'total',
            'columns',
        ]);
    }

    public function test_show_reporte_movimiento(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create();

        $reporteMovimiento = ReporteMovimiento::factory()->create([
            'producto_id' => $producto->id,
        ]);

        $response = $this->get("/api/reporte-movimientos/{$reporteMovimiento->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'producto_id',
                'tipo_movimiento_id',
                'cantidad',
                'cantidad_anterior',
                'cantidad_actual',
                'user_id',
                'created_at',
            ],
        ]);
    }

    public function test_store_reporte_movimiento(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create();
        $user = User::factory()->create();

        $cantidadAnterior = $producto->stock;

        $cantidad = $this->faker->numberBetween(1, 10);
        $cantidadActual = $cantidadAnterior + $cantidad;

        $payload = [
            'producto_id' => $producto->id,
            'user_id' => $user->id,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'cantidad' => $cantidad,
            'cantidad_anterior' => $cantidadAnterior,
            'cantidad_actual' => $cantidadActual,
        ];

        $response = $this->post('/api/reporte-movimientos', $payload);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'producto_id',
                'tipo_movimiento_id',
                'cantidad',
                'cantidad_anterior',
                'cantidad_actual',
                'user_id',
            ],
        ]);

        $this->assertDatabaseHas('reporte_movimientos', [
            'producto_id' => $producto->id,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'cantidad' => $cantidad,
            'cantidad_anterior' => $cantidadAnterior,
            'cantidad_actual' => $cantidadActual,
        ]);

        $this->assertDatabaseHas('productos', [
            'id' => $producto->id,
            'stock' => $cantidadActual,
        ]);
    }

    public function test_update_reporte_movimiento(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create();
        $user = User::factory()->create();

        $reporteMovimiento = ReporteMovimiento::factory()->create([
            'producto_id' => $producto->id,
            'user_id' => $user->id,
        ]);

        $payload = [
            'producto_id' => $producto->id,
            'user_id' => $user->id,
            'tipo_movimiento_id' => TipoMovimientoEnum::ENTRADA->value,
            'cantidad' => 5,
            'cantidad_anterior' => 10,
            'cantidad_actual' => 15,
            'created_at' => $reporteMovimiento->created_at,
        ];

        $response = $this->put("/api/reporte-movimientos/{$reporteMovimiento->id}", $payload);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'producto_id',
                'tipo_movimiento_id',
                'cantidad',
                'cantidad_anterior',
                'cantidad_actual',
                'user_id',
            ],
        ]);
    }

    public function test_delete_reporte_movimiento(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create();
        $user = User::factory()->create();

        $reporteMovimiento = ReporteMovimiento::factory()->create([
            'producto_id' => $producto->id,
            'user_id' => $user->id,
        ]);

        $response = $this->delete("/api/reporte-movimientos/{$reporteMovimiento->id}");
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => 'Movimiento eliminado',
            'data' => false,
        ]);
    }
}
