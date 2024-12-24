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

            $userInfo = User::join('user_infos', 'users.user_info_id', '=', 'user_infos.id')
                ->select(
                    'user_infos.id',
                    'user_infos.first_name',
                    'user_infos.last_name',
                    'users.email',
                )
                ->where('users.id', $request->user()->id)
                ->first();

            return response()->json([
                'success' => true,
                'flag' => 200,
                'message' => 'Login successful',
                'user' => $userInfo,
                'token' => $token
            ]);
        }

        return response()->json([
            'success' => false,
            'flag' => 401,
            'message' => 'Email or password is incorrect',
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

