<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exigency;

class ExigencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exigencies = json_decode(file_get_contents(public_path('seeder_files/exigencies.json')), true);

        $currentTime = now();

        foreach ($exigencies as $row) {
            $norm_sub_chapter_id = $row['norm_sub_chapter_id'];
            
            foreach ($row['exigencies'] as $exigency) {
                Exigency::insert([
                    'norm_sub_chapter_id' => $norm_sub_chapter_id,
                    'exigency_title' => $exigency['exigency_title'],
                    'exigency_description' => $exigency['exigency_description'],
                    'created_at' => $currentTime,
                    'updated_at' => $currentTime,
                ]);
            }
        }
    }
}
