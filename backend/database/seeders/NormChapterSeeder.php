<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\NormChapter;

class NormChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $normChapters = [
            [
                "chapter_ref" => "Chapitre 1",
                "chapter_title" => "Champ d'application"
            ],
            [
                "chapter_ref" => "Chapitre 2",
                "chapter_title" => "Références normatives"
            ],
            [
                "chapter_ref" => "Chapitre 3",
                "chapter_title" => "Termes et définitions"
            ],
            [
                "chapter_ref" => "Chapitre 4",
                "chapter_title" => "Contexte de l'organisation"
            ],
            [
                "chapter_ref" => "Chapitre 5",
                "chapter_title" => "Direction et participation des travailleurs"
            ],
            [
                "chapter_ref" => "Chapitre 6",
                "chapter_title" => "Planification"
            ],
            [
                "chapter_ref" => "Chapitre 7",
                "chapter_title" => "Support"
            ],
            [
                "chapter_ref" => "Chapitre 8",
                "chapter_title" => "Exécution"
            ],
            [
                "chapter_ref" => "Chapitre 9",
                "chapter_title" => "Évaluation des performances"
            ],
            [
                "chapter_ref" => "Chapitre 10",
                "chapter_title" => "Amélioration"
            ]
        ];

        $currentTime = now();


        foreach ($normChapters as $normChapter) {
            NormChapter::insert([
                'norm_id' => 1,
                'chapter_ref' => $normChapter['chapter_ref'],
                'chapter_title' => $normChapter['chapter_title'],
                'created_at' => $currentTime,
                'updated_at' => $currentTime,
            ]);
        }
    }
}
