<?php

namespace Tests\Feature\Proveedor;

use App\Models\Categoria;
use App\Models\Proveedor;
use App\Models\ProveedorCategoria;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProveedorTest extends TestCase
{
    public function test_index_proveedor(): void
    {
        $this->loginAdmin();
        Proveedor::all()->map(function ($item) {
            ProveedorCategoria::create([
                'proveedor_id' => $item->id,
                'categoria_id' => Categoria::first()->id
            ]);
        });
        // fetch data
        $response = $this->get('/api/proveedores');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'observaciones',
                    'categoria' => [
                        '*' => [
                            'id',
                            'nombre'
                        ]
                    ],
                ],
            ],
        ]);
    }

    // public function test_show_proveedor(): void {}
    // public function test_store_with_categorias_proveedor(): void {}
}
