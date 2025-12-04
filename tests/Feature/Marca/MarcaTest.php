<?php

namespace tests\Feature\Marca;

use App\Models\Marca;
use Tests\TestCase;

class MarcaTest extends TestCase
{
    public function test_index_marcas(): void
    {
        $this->loginAdmin();
        Marca::factory()->count(10)->create();

        $response = $this->get('api/marcas');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'total',
            'data' => [
                '*' => [
                    'id',
                    'nombre',
                ],
            ],
        ]);

        $total = $response->json('total');
        $this->assertEquals($total, Marca::all()->count());
    }

    public function test_show_marca(): void
    {
        $this->loginAdmin();

        $marca = Marca::factory()->create();

        $response = $this->get("api/marcas/{$marca->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'nombre',
            ],
        ]);

        $response->assertJson([
            'data' => [
                'id' => $marca->id,
                'nombre' => $marca->nombre,
            ],
        ]);
    }

    public function test_store_marca(): void
    {
        $this->loginAdmin();

        $payload = [
            'nombre' => $this->faker->unique()->word,
        ];

        $response = $this->post('/api/marcas', $payload);
        $response->assertStatus(200);

        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'created_at',
                'updated_at',
            ],
        ]);
        $response->json('data');

        $this->assertDatabaseHas('marcas', [
            'nombre' => $payload['nombre'],
        ]);
    }

    public function test_update_marca(): void
    {
        $this->loginAdmin();

        $marca = Marca::factory()->create();

        $payload = [
            'nombre' => $this->faker->unique()->word,
        ];

        $response = $this->put("/api/marcas/{$marca->id}", $payload);
        $response->assertStatus(200);

        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'created_at',
                'updated_at',
            ],
        ]);

        $this->assertDatabaseHas('marcas', [
            'id' => $marca->id,
            'nombre' => $payload['nombre'],
        ]);
    }

    public function test_delete_marca(): void
    {
        $this->loginAdmin();

        $marca = Marca::factory()->create();

        $response = $this->delete("/api/marcas/{$marca->id}");
        $response->assertStatus(200);

        $response->assertJsonStructure([
            'status',
            'message',
            'data',
        ]);

        $this->assertSoftDeleted('marcas', [
            'id' => $marca->id,
        ]);
    }
}
