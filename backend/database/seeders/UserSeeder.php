<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'NOM_UTILISATEUR' => 'admin',
            'PRENOM_UTILISATEUR' => 'admin',
            'NUMERO_TELEPHONE' => '1234567890',
            'email' => 'rihab@gmail.com',
            'password' => Hash::make('admin'),
            'ROLE_UTILISATEUR' => 'admin',
        ]);
    
    }
}
