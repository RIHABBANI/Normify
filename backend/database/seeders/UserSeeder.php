<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\UserInfo;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userInfo = UserInfo::create([
            'first_name' => 'Normify',
            'last_name' => 'Admin',
            'phone' => '0666666666',
            'matriculation' => '123456789',
        ]);

        $user = User::create([
            'user_info_id' => $userInfo->id,
            'email' => 'normifyteam@gmail.com',
            'password' => Hash::make('password')
        ]);
    }
}
