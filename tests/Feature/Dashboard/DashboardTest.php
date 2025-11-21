<?php

namespace Tests\Feature\Dashboard;

use App\Enums\StatusVentaEnum;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_total_ventas()
    {
        $this->loginAdmin();

        Venta::factory()->count(5)->withProductos(1)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'venta_total' => 100,
        ]);

        $expectedTotal = Venta::where('status_venta', StatusVentaEnum::Finalizada)
            ->whereHas('ventaProductos')
            ->sum('venta_total');

        $response = $this->getJson('/api/dashboard/total-ventas');

        $response->assertStatus(200);

        $this->assertEquals($expectedTotal, $response->json('data.total'));
    }

    public function test_mas_vendidos()
    {
        $this->loginAdmin();

        Venta::factory()->count(10)->withProductos(10)->create();

        $expected = VentaProducto::masVendidos(10);

        $response = $this->getJson('/api/dashboard/mas-vendidos');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'producto',
                    'cantidad',
                ],
            ],
        ]);

        $this->assertCount(10, $response['data']);

        $this->assertEquals(
            $expected->toArray(),
            $response->json('data')
        );
    }

    public function test_menos_vendidos()
    {
        $this->loginAdmin();

        Venta::factory()->count(10)->withProductos(10)->create();

        $expected = VentaProducto::menosVendidos(10);

        $response = $this->getJson('/api/dashboard/menos-vendidos');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'producto',
                    'cantidad',
                ],
            ],
        ]);

        $this->assertCount(10, $response['data']);

        $this->assertEquals(
            $expected->toArray(),
            $response->json('data')
        );
    }

    public function test_ventas_por_mes()
    {
        $this->loginAdmin();

        Venta::factory()->count(5)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'venta_total' => 100,
            'created_at' => now(),
        ]);

        $response = $this->getJson('/api/dashboard/ventas');

        $response->assertStatus(200);

        $mesActual = now()->format('F');
        $registroMes = collect($response->json('data'))->firstWhere('month', $mesActual);

        $expected = [
            'total' => Venta::where('status_venta', StatusVentaEnum::Finalizada)
                ->whereHas('ventaProductos')
                ->whereMonth('created_at', now()->month)
                ->sum('venta_total'),
            'cantidad' => Venta::where('status_venta', StatusVentaEnum::Finalizada)
                ->whereHas('ventaProductos')
                ->whereMonth('created_at', now()->month)
                ->count(),
        ];

        $this->assertEquals($expected['total'], $registroMes['total']);
        $this->assertEquals($expected['cantidad'], $registroMes['cantidad']);
    }
}
