<?php

namespace Tests\Feature\Dashboard;

use App\Enums\StatusVentaEnum;
use App\Models\Venta;
use App\Models\VentaProducto;
use App\Repositories\CategoryRepository;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    public function test_total_ventas()
    {
        $this->loginAdmin();

        Venta::factory()->count(5)->withProductos(1)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
        ]);

        $ventas = Venta::where('status_venta', StatusVentaEnum::Finalizada)
            ->whereHas('ventaProductos')
            ->get();

        $expectedTotal = 0;
        foreach ($ventas as $venta) {
            $expectedTotal += $venta->ventaTotal();
        }

        $response = $this->getJson('/api/dashboard/total-ventas');
        $response->assertStatus(200);

        $this->assertEquals(round($expectedTotal, 2), round($response->json('data.total'), 2));
    }

    public function test_mas_vendidos_por_categoria()
    {
        $this->loginAdmin();

        Venta::factory()->count(10)->withProductos(10)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
        ]);

        $categoriaId = CategoryRepository::findByName('Luces')->id;
        $expected = VentaProducto::masVendidos(categoriaId: $categoriaId);
        $response = $this->getJson('/api/dashboard/mas-vendidos?categoria_id='.$categoriaId);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'image',
                    'producto',
                    'categoria',
                    'subcategoria',
                    'cantidad',
                ],
            ],
        ]);

        $this->assertEquals(
            $expected->toArray(),
            $response->json('data')
        );
    }

    public function test_menos_vendidos()
    {
        $this->loginAdmin();

        Venta::factory()->count(10)->withProductos(10)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
        ]);

        $expected = VentaProducto::menosVendidos();

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

        Venta::factory()->count(5)->withProductos(1)->create([
            'status_venta' => StatusVentaEnum::Finalizada->value,
            'created_at' => now(),
        ]);

        $response = $this->getJson('/api/dashboard/ventas');
        $response->assertStatus(200);

        $mesActual = now()->format('F');
        $registroMes = collect($response->json('data'))
            ->firstWhere('month', $mesActual);

        $ventasFinalizadas = Venta::query()
            ->where('status_venta', StatusVentaEnum::Finalizada)
            ->whereHas('ventaProductos')
            ->whereMonth('created_at', now()->month)
            ->get();

        $expected = [
            'total' => round($ventasFinalizadas->sum(fn ($venta) => $venta->ventaTotal()), 2),
            'cantidad' => $ventasFinalizadas->count(),
        ];

        $this->assertEquals($expected['total'], $registroMes['total'], 'El total de ventas no coincide');
        $this->assertEquals($expected['cantidad'], $registroMes['cantidad'], 'La cantidad de ventas no coincide');
    }
}
