<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{

    // api/auth/login
    public function test_login_screen_can_be_rendered()
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function test_users_can_authenticate()
    {
        $user = User::factory()->create();

        $response = $this->post('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'access_token'
            ],
        ]);

        $this->assertAuthenticatedAs($user);
    }

    public function test_users_can_not_authenticate_with_invalid_password()
    {
        $user = User::factory()->create();
        $response = $this->post('/api/auth/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(422);
        $response->assertJson([
            "status" => "error",
            "message" => "Credencial no válida.",
            "data" => null
        ])->assertJsonStructure([
            "status",
            "message",
            "data"
        ]);
    }

    public function test_users_can_logout()
    {
        $this->loginAdmin();
        $response = $this->post('/api/auth/logout');
        $response->assertStatus(200);
        $response->assertJson([
            "status" => "OK",
            "message" => "Se cerro la session correctamente",
            "data" => null
        ])->assertJsonStructure([
            "status",
            "message",
            "data"
        ]);
    }
}
