<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\Norm;

class NormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $norm = [
            "norm_ref"=> "45001",
            "norm_abbreviation_name"=> "SMSST",
            "norm_complet_name"=> "Systèmes de Management de la Santé et de la Sécurité au Travail",
            "norm_version"=> "2018",
            "norm_pub_date"=> "2018-03-12",
        ];

        $currentTime = now();

        Norm::insert([
            'norm_ref' => $norm['norm_ref'],
            'norm_abbreviation_name' => $norm['norm_abbreviation_name'],
            'norm_complet_name' => $norm['norm_complet_name'],
            'norm_version' => $norm['norm_version'],
            'norm_pub_date' => $norm['norm_pub_date'],
            'created_at' => $currentTime,
            'updated_at' => $currentTime,
        ]);
    }
}
