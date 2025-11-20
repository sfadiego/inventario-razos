<?php

namespace Tests\Feature\Dashboard;

use App\Enums\StatusVentaEnum;
use App\Models\Producto;
use App\Models\Venta;
use App\Models\VentaProducto;
use Tests\TestCase;

class DashboardMenosVendidoTest extends TestCase
{
    public function test_menos_vendidos_10()
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
                'cantidad' => 15 - $index,
            ]);
        }

        $response = $this->getJson('/api/dashboard/menos-vendidos');

        $response->assertStatus(200);

        $json = $response->json('data');

        $this->assertCount(10, $json);

        $cantidades = collect($json)->pluck('cantidad')->toArray();
        $sorted = $cantidades;
        sort($sorted);
        $this->assertEquals($sorted, $cantidades);

        $this->assertTrue(in_array('1.00', $cantidades));
    }
}
