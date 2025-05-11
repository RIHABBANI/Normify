<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $Users = User::all();
        return response()->json($Users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'NOM_UTILISATEUR' => 'required|string|max:50',
            'password' => 'required|string|max:225',
            'ROLE_UTILISATEUR' => 'required|string|max:225',
            'email' => 'required|email|max:255|unique:users,NOM_UTILISATEUR'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        $User = User::create($validated);
        return response()->json($User, 201);
    }

    public function show(User $User)
    {
        return response()->json($User->load('interventions', 'maintenances'));
    }

    public function update(Request $request, User $User)
    {
        $validated = $request->validate([
            'NOM_UTILISATEUR' => 'sometimes|string|max:50',
            'password' => 'sometimes|string|max:225',
            'ROLE_UTILISATEUR' => 'sometimes|string|max:225',
            'email' => 'sometimes|email|max:255|unique:users,NOM_UTILISATEUR,' . $User->ID_UTILISATEUR
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $User->update($validated);
        return response()->json($User);
    }

    public function destroy(User $User)
    {
        $User->delete();
        return response()->json(null, 204);
    }



    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
