<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        return response()->json([
            'message' => 'Login',
            'data' => $request->all()
        ]);
    }
}
