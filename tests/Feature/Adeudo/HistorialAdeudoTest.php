<?php

namespace Tests\Feature\Adeudo;

use App\Models\Cliente;
use App\Models\HistorialAdeudo;
use Tests\TestCase;

class HistorialAdeudoTest extends TestCase
{
    public function test_liquidar_adeudos_cliente(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create(['adeudo' => -500]);

        HistorialAdeudo::factory()->create([
            'cliente_id' => $cliente->id,
            'pagado' => false,
        ]);

        $response = $this->putJson("/api/adeudos/{$cliente->id}/liquidar-todos");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Adeudos liquidado',
            ]);

        $this->assertEquals(0, $cliente->fresh()->adeudo);

        $this->assertCount(
            0,
            HistorialAdeudo::where('cliente_id', $cliente->id)->where('pagado', false)->get()
        );
    }

    public function test_liquidar_adeudo_pagado(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create(['adeudo' => 500]);

        $adeudo = HistorialAdeudo::factory()->create([
            'cliente_id' => $cliente->id,
            'total_adeudo' => 200,
            'pagado' => true,
        ]);

        $response = $this->putJson("/api/adeudos/{$adeudo->id}/liquidar");

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'Adeudo ya pagado',
            ]);

        $this->assertTrue($adeudo->fresh()->pagado);

    }

    public function test_update_adeudo_individual(): void
    {
        $this->loginAdmin();

        $cliente = Cliente::factory()->create(['adeudo' => 500]);

        $adeudo = HistorialAdeudo::factory()->create([
            'cliente_id' => $cliente->id,
            'total_adeudo' => 150,
            'pagado' => false,
        ]);

        $response = $this->putJson("/api/adeudos/{$adeudo->id}/liquidar");

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'Adeudo liquidado',
            ]);

        $this->assertTrue($adeudo->fresh()->pagado);
        $this->assertEquals(350, $cliente->fresh()->adeudo);
    }
}
