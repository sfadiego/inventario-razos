<?php

namespace Tests\Feature\Ubicacion;

use App\Models\Ubicacion;
use Tests\TestCase;

class UbicacionesTest extends TestCase
{
    public function test_index_ubicacion(): void
    {
        $this->loginAdmin();

        Ubicacion::factory()->count(3)->create();

        $response = $this->get('/api/ubicaciones');

        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'id',
                    'nombre',
                    'created_at',
                    'updated_at',
                ],
            ],
            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'next_page_url',
            'path',
            'per_page',
            'prev_page_url',
            'to',
            'total',
        ]);

        $this->assertEquals(Ubicacion::count(), $response->json('total'));
    }

    public function test_store_ubicacion(): void
    {
        $this->loginAdmin();

        $payload = Ubicacion::factory()->make()->toArray();

        $response = $this->post('/api/ubicaciones', $payload);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => ['nombre' => $payload['nombre']],
        ]);

        $this->assertDatabaseHas('ubicaciones', [
            'id' => $response->json('data.id'),
            'nombre' => $payload['nombre'],
        ]);
    }

    public function test_store_ubicacion_nombre_duplicado(): void
    {
        $this->loginAdmin();
        $this->withExceptionHandling();

        $ubicacion = Ubicacion::factory()->create();

        $response = $this->post('/api/ubicaciones', ['nombre' => $ubicacion->nombre]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['nombre']);
    }

    public function test_show_ubicacion(): void
    {
        $this->loginAdmin();

        $ubicacion = Ubicacion::factory()->create();

        $response = $this->get("/api/ubicaciones/{$ubicacion->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $ubicacion->id,
                'nombre' => $ubicacion->nombre,
            ],
        ]);
    }

    public function test_update_ubicacion(): void
    {
        $this->loginAdmin();

        $ubicacion = Ubicacion::factory()->create();
        $payload = Ubicacion::factory()->make()->toArray();

        $response = $this->put("/api/ubicaciones/{$ubicacion->id}", $payload);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $ubicacion->id,
                'nombre' => $payload['nombre'],
            ],
        ]);

        $this->assertDatabaseHas('ubicaciones', [
            'id' => $ubicacion->id,
            'nombre' => $payload['nombre'],
        ]);
    }

    public function test_delete_ubicacion(): void
    {
        $this->loginAdmin();

        $ubicacion = Ubicacion::factory()->create();

        $response = $this->delete("/api/ubicaciones/{$ubicacion->id}");

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => 'Ubicación eliminada',
            'data' => false,
        ]);

        $this->assertDatabaseMissing('ubicaciones', ['id' => $ubicacion->id]);
    }
}
