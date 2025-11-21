<?php

namespace Tests\Feature\Dashboard;

use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class DashboardMenosVendidosTest extends TestCase
{
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

        foreach ($response['data'] as $index => $item) {
            $this->assertEquals($expected[$index]['producto'], $item['producto']);
            $this->assertEquals($expected[$index]['cantidad'], $item['cantidad']);
        }
    }
}
