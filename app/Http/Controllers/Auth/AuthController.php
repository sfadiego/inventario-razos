<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->all();

        $user = User::register(
            name: $data['name'],
            email: $data['email'],
            password: $data['password'],
        );

        return Response::success([
            'user' => $user->toArray(),
            'token' => $user->createToken('access_token')->plainTextToken,
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::login(
            email: $data['email'],
            password: $data['password']
        );

        return $user ? Response::success($user) : Response::error(__('Credencial no válida.'));
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return Response::success(null, 'Se cerro la session correctamente');
    }
}
