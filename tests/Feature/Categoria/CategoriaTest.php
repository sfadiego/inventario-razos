<?php

namespace Tests\Feature\Categoria;

use App\Models\Categoria;
use Tests\TestCase;

class CategoriaTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_categoria(): void
    {
        $this->loginAdmin();

        Categoria::factory()->count(10)->create();

        $response = $this->get('/api/categorias');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'activa',
                ],
            ],
        ]);

        //valida desde bd que si existan los registros y la respuesta
        //agregar en los inserts
        $this->assertDatabaseCount('categorias', Categoria::count());
        $this->assertDatabaseCount('categorias', $response->json('total'));
    }

    public function test_store_categoria(): void
    {
        $this->loginAdmin();

        $payload = [
            'nombre' => $this->faker->name,
            'activa' => $this->faker->boolean,
        ];

        $response = $this->post('/api/categorias', $payload);
        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'nombre' => $payload['nombre'],
                'activa' => $payload['activa'],
            ],
        ]);


    }

    public function test_show_categoria(): void
    {
        $this->loginAdmin();

        $categoria = Categoria::factory()->create();

        $response = $this->get("/api/categorias/{$categoria->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'activa',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_update_categoria(): void
    {
        $this->loginAdmin();

        $categoria = Categoria::factory()->create();

        $payload = [
            'nombre' => $this->faker->name,
            'activa' => $this->faker->boolean,
        ];

        $response = $this->put("/api/categorias/{$categoria->id}", $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $categoria->id,
                'nombre' => $payload['nombre'],
                'activa' => $payload['activa'],
            ],
        ]);
    }

    public function test_delete_categoria(): void
    {
        $this->loginAdmin();

        $categoria = Categoria::factory()->create();

        $response = $this->delete("/api/categorias/{$categoria->id}");
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $categoria->id,
            ],
        ]);
    }
}
