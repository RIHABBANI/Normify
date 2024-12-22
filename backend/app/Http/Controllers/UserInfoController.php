<?php

namespace App\Http\Controllers;

use App\Models\UserInfo;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserInfoController extends Controller
{
    public function show(){
        $userInfo = UserInfo::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'User Info retrieved successfully',
            'data' => $userInfo,
        ]);
    }

    public function showById($id){
        $userInfo = UserInfo::find($id);

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'User Info retrieved successfully',
            'data' => $userInfo,
        ]);
    }
    
    public function store(Request $request)
    {
        $userInfoValidated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'matriculation' => 'required|string|max:20',
        ]);

        $userValidated = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|regex:/^[a-zA-Z0-9]+$/',
        ]);
        
        $userInfo = UserInfo::create($userInfoValidated);

        $user = $userInfo->user()->create([
            'email' => $userValidated['email'],
            'password' => Hash::make($userValidated['password']),
            'user_info_id' => $userInfo->id,
        ]);

        $data = [
            'userInfo' => $userInfo,
            'user' => $user,
        ];

        return response()->json([
            'success' => true,
            'flag' => 201,
            'message' => 'User created successfully',
            'data' => $data,
        ]);
    }

    public function update(Request $request, $id)
    {
        $userInfo = UserInfo::find($id);
        $user = $userInfo->user;

        if (!$userInfo) {
            return response()->json([
                'success' => false,
                'flag' => 404,
                'message' => 'User Info not found',
            ]);
        }
        if (!$user) {
            return response()->json([
                'success' => false,
                'flag' => 404,
                'message' => 'User not found',
            ]);
        }

        $userInfoValidated = $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'matriculation' => 'required|string|max:20',
        ]);

        $userValidated = $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|regex:/^[a-zA-Z0-9]+$/',
        ]);

        $userInfo->update($userInfoValidated);
        $user->update([
            'email' => $userValidated['email'],
            'password' => Hash::make($userValidated['password']),
        ]);

        $data = [
            'userInfo' => $userInfo,
            'user' => $user,
        ];

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'User updated successfully',
            'data' => $data,
        ]);
    }

    public function destroy($id)
    {
        $userInfo = UserInfo::find($id);
        $user = $userInfo->user;

        if (!$userInfo) {
            return response()->json([
                'success' => false,
                'flag' => 404,
                'message' => 'User Info not found',
            ]);
        }
        if (!$user) {
            return response()->json([
                'success' => false,
                'flag' => 404,
                'message' => 'User not found',
            ]);
        }

        $user->delete();
        $userInfo->delete();

        $data = $this->show();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'User deleted successfully',
            'data' => $data,
        ]);
    }
}
