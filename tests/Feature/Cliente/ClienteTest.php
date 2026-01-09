<?php

namespace Tests\Feature\Cliente;

use App\Models\Cliente;
use Tests\TestCase;

class ClienteTest extends TestCase
{
    public function test_index_cliente(): void
    {
        $this->loginAdmin();

        Cliente::factory()->count(10)->create();

        $response = $this->get('/api/clientes');
        $response->assertStatus(206);
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                '*' => [
                    'nombre',
                    'confiable',
                    'observaciones',
                    'adeudo',
                ],
            ],
        ]);
    }

    public function test_show_cliente(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create();

        $response = $this->get("/api/clientes/{$cliente->id}");
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'id',
                'nombre',
                'confiable',
                'observaciones',
                'adeudo',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_store_cliente(): void
    {
        $this->loginAdmin();

        $payload = [
            'nombre' => $this->faker->name,
            'confiable' => $this->faker->boolean,
            'observaciones' => $this->faker->text,
            'adeudo' => $this->faker->randomFloat(),
        ];

        $response = $this->post('/api/clientes', $payload);
        $response->assertStatus(200);

        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'nombre' => $payload['nombre'],
                'confiable' => $payload['confiable'],
                'observaciones' => $payload['observaciones'],
                'adeudo' => $payload['adeudo'],
            ],
        ]);
    }

    public function test_update_cliente(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create();

        $payload = [
            'nombre' => $this->faker->name,
            'confiable' => $this->faker->boolean,
            'observaciones' => $this->faker->text,
            'adeudo' => $this->faker->randomFloat(),
        ];

        $response = $this->put("/api/clientes/{$cliente->id}", $payload);
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => null,
            'data' => [
                'id' => $cliente->id,
                'nombre' => $payload['nombre'],
                'confiable' => $payload['confiable'],
                'observaciones' => $payload['observaciones'],
                'adeudo' => $payload['adeudo'],
            ],
        ]);
    }

    public function test_delete_cliente(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create();

        $response = $this->delete("/api/clientes/{$cliente->id}");
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 'OK',
            'message' => 'Cliente eliminado',
            'data' => false,
        ]);
    }
}
