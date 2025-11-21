<?php

namespace Tests\Feature\Subcategoria;

use App\Models\Categoria;
use App\Models\Subcategoria;
use Tests\TestCase;

class SubcategoriaTest extends TestCase
{
    public function test_index_subcategorias(): void
    {
        $this->loginAdmin();

        Subcategoria::factory()->count(5)->create();

        $response = $this->getJson('/api/subcategorias');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'id',
                    'nombre',
                    'categoria_id',
                ],
            ],
            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'links' => [
                '*' => ['url', 'label', 'page', 'active'],
            ],
            'next_page_url',
            'path',
            'per_page',
            'prev_page_url',
            'to',
            'total',
            'columns' => [
                '*' => ['accessor', 'title'],
            ],
        ]);

        $this->assertEquals(Subcategoria::count(), $response->json('total'));
    }

    public function test_show_subcategoria(): void
    {
        $this->loginAdmin();

        $subcategoria = Subcategoria::factory()->create();

        $response = $this->getJson("/api/subcategorias/{$subcategoria->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'categoria_id',
            ],
        ]);

        $this->assertEquals($subcategoria->id, $response->json('data.id'));
    }

    public function test_store_subcategoria(): void
    {
        $this->loginAdmin();

        $payload = [
            'nombre' => 'Nueva Subcategoria',
            'categoria_id' => Categoria::factory()->create()->id,
        ];

        $response = $this->post('/api/subcategorias', $payload);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'nombre' => $payload['nombre'],
                'categoria_id' => $payload['categoria_id'],
            ],
        ]);
    }

    public function test_update_subcategoria(): void
    {
        $this->loginAdmin();

        $subcategoria = Subcategoria::factory()->create();

        $payload = [
            'nombre' => fake()->unique()->word,
            'categoria_id' => Categoria::factory()->create()->first()->id,
        ];

        $response = $this->put("/api/subcategorias/{$subcategoria->id}", $payload);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $subcategoria->id,
                'nombre' => $payload['nombre'],
                'categoria_id' => $payload['categoria_id'],
            ],
        ]);
    }

    public function test_delete_subcategoria(): void
    {
        $this->loginAdmin();

        $subcategoria = Subcategoria::factory()->create();

        $response = $this->delete("/api/subcategorias/{$subcategoria->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $subcategoria->id,
            ],
        ]);
    }
}
