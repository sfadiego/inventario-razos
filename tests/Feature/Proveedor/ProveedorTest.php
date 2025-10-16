<?php

namespace Tests\Feature\Proveedor;

use App\Models\Categoria;
use App\Models\Proveedor;
use App\Models\ProveedorCategoria;
use Tests\TestCase;

class ProveedorTest extends TestCase
{
    public function test_index_proveedor(): void
    {
        $this->loginAdmin();
        Proveedor::all()->map(function ($item) {
            ProveedorCategoria::create([
                'proveedor_id' => $item->id,
                'categoria_id' => Categoria::first()->id,
            ]);
        });

        $response = $this->get('/api/proveedores');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'observaciones',
                    'categorias' => [
                        '*' => [
                            'id',
                            'nombre',
                        ],
                    ],
                ],
            ],
        ]);
    }

    public function test_show_proveedor(): void
    {
        $this->loginAdmin();

        $proveedor = Proveedor::factory()->create();

        $response = $this->get("/api/proveedores/{$proveedor->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'observaciones',
                'categorias' => [
                    '*' => [
                        'id',
                        'nombre',
                    ],
                ],
            ],
        ]);
    }

    public function test_update_proveedor(): void
    {
        $this->loginAdmin();

        $proveedor = Proveedor::factory()->create();
        $categoria = Categoria::factory()->create();

        $payload = [
            'nombre' => 'Proveedor Test Updated',
            'observaciones' => 'Observaciones del proveedor actualizadas',
            'categorias' => [
                $categoria->id,
            ],
        ];

        $response = $this->put("/api/proveedores/{$proveedor->id}", $payload);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'observaciones',
            ],
        ]);
    }

    public function test_delete_proveedor(): void
    {
        $this->loginAdmin();

        $proveedor = Proveedor::factory()->create();

        $response = $this->delete("/api/proveedores/{$proveedor->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);
    }

    public function test_store_proveedor_whith_categories(): void
    {
        $this->loginAdmin();

        $categoria = Categoria::factory()->create();

        $payload = [
            'nombre' => $this->faker->unique()->company,
            'observaciones' => $this->faker->text(50),
            'categorias' => [
                $categoria->id,
            ],
        ];

        $response = $this->post('/api/proveedores', $payload);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'observaciones',
                'categorias' => [
                    '*' => [
                        'id',
                        'nombre',
                    ],
                ],
            ],
        ]);

        $response->assertJsonFragment([
            'nombre' => $payload['nombre'],
            'observaciones' => $payload['observaciones'],
            'id' => Proveedor::latest()->first()->id,
            'id' => $categoria->id,
        ]);
    }
}
