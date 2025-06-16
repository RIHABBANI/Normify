<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'NOM_UTILISATEUR' => 'admin',
                'PRENOM_UTILISATEUR' => 'admin',
                'NUMERO_TELEPHONE' => '1234567890',
                'email' => 'admin@gmao.com',
                'password' => Hash::make('admin'),
                'ROLE_UTILISATEUR' => 'admin',
            ],
            [
                'NOM_UTILISATEUR' => 'Bani',
                'PRENOM_UTILISATEUR' => 'Rihab',
                'NUMERO_TELEPHONE' => '0604781467',
                'email' => 'rihab.bani@uit.ac.ma',
                'password' => Hash::make('password'),
                'ROLE_UTILISATEUR' => 'admin',
            ],
            [
                'NOM_UTILISATEUR' => 'Dupont',
                'PRENOM_UTILISATEUR' => 'Jean',
                'NUMERO_TELEPHONE' => '0601234567',
                'email' => 'jean.dupont@gmaom',
                'password' => Hash::make('password'),
                'ROLE_UTILISATEUR' => 'technicien',
            ],
            [
                'NOM_UTILISATEUR' => 'Martin',
                'PRENOM_UTILISATEUR' => 'Marie',
                'NUMERO_TELEPHONE' => '0607654321',
                'email' => 'marie.martin@gmao.com',
                'password' => Hash::make('password'),
                'ROLE_UTILISATEUR' => 'operateur',
            ],
            [
                'NOM_UTILISATEUR' => 'Benali',
                'PRENOM_UTILISATEUR' => 'Ahmed',
                'NUMERO_TELEPHONE' => '0698765432',
                'email' => 'ahmed.benali@gmaom',
                'password' => Hash::make('password'),
                'ROLE_UTILISATEUR' => 'technicien',
            ],
            [
                'NOM_UTILISATEUR' => 'Alami',
                'PRENOM_UTILISATEUR' => 'Fatima',
                'NUMERO_TELEPHONE' => '0687654321',
                'email' => 'fatima.alami@gmao.com',
                'password' => Hash::make('password'),
                'ROLE_UTILISATEUR' => 'superviseur',
            ]
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }
    }
}
