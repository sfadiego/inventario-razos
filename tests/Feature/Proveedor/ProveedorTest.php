<?php

namespace Tests\Feature\Venta;

use App\Models\Proveedor;
use App\Models\Venta;
use Tests\TestCase;

class ProveedorTest extends TestCase
{
    public function test_index_proveedor(): void
    {
        $this->loginAdmin();
        // crear venta
        Proveedor::factory()->count(10)->create();

        // fetch data
        $response = $this->get('/api/proveedores');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'empresa',
                    'observaciones',
                ],
            ],
        ]);
    }

    // public function test_show_proveedor(): void {}
    // public function test_store_with_categorias_proveedor(): void {}
}
