<?php

namespace Tests\Feature\Dashboard;

use App\Enums\StatusVentaEnum;
use App\Models\Producto;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_total_ventas()
    {
        $this->loginAdmin();

        Venta::factory()->count(5)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'venta_total' => 100,
        ]);

        Venta::factory()->count(3)->create([
            'status_venta' => StatusVentaEnum::Activa->value,
            'venta_total' => 200,
        ]);

        $response = $this->getJson('/api/dashboard/total-ventas');

        $response->assertStatus(200)
            ->assertJsonFragment(['total' => 500]);

        $response = $this->getJson('/api/dashboard/total-ventas?fecha='.now()->subDay()->toDateString());
        $response->assertStatus(200);
    }

    public function test_mas_vendidos_10()
    {
        $this->loginAdmin();

        $ventaFinalizada = Venta::factory()->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
        ]);

        $productos = Producto::factory()->count(15)->create();

        foreach ($productos as $index => $producto) {
            VentaProducto::factory()->create([
                'venta_id' => $ventaFinalizada->id,
                'producto_id' => $producto->id,
                'cantidad' => $index + 1,
            ]);
        }

        $response = $this->getJson('/api/dashboard/mas-vendidos');

        $response->assertStatus(200);

        $json = $response->json('data');

        $this->assertCount(10, $json);

        $cantidades = collect($json)->pluck('cantidad')->toArray();
        $sorted = $cantidades;
        rsort($sorted);

        $this->assertEquals($sorted, $cantidades);

        $this->assertTrue(in_array(15, $cantidades));
    }

    public function test_ventas_por_mes()
    {
        $this->loginAdmin();

        Venta::factory()->count(5)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'venta_total' => 100,
            'created_at' => now(),
        ]);

        Venta::factory()->count(3)->create([
            'status_venta' => StatusVentaEnum::Activa->value,
            'venta_total' => 200,
            'created_at' => now(),
        ]);

        $response = $this->getJson('/api/dashboard/ventas');

        $response->assertStatus(200);

        $json = $response->json('data');

        $this->assertCount(12, $json);

        $mesActual = now()->format('F');

        $registroMes = collect($json)->firstWhere('month', $mesActual);

        $this->assertEquals(500, $registroMes['total']);
        $this->assertEquals(5, $registroMes['cantidad']);

        $mesVacio = collect($json)->firstWhere('month', 'January');
        if ($mesVacio['month'] !== $mesActual) {
            $this->assertEquals(0, $mesVacio['total']);
            $this->assertEquals(0, $mesVacio['cantidad']);
        }
    }
}
