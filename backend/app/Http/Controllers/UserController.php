<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $token = $request->user()->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'flag' => 200,
                'message' => 'Login successful',
                'user' => $request->user(),
                'token' => $token
            ]);
        }

        return response()->json([
            'success' => false,
            'flag' => 401,
            'message' => 'Unauthorized',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Logout successful',
        ]);
    }
}

