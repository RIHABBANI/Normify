<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\NormSubChapter;

class NormSubChapterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $normSubChapters = [
            ["norm_chapter_id" => 4, "sub_chapter_title" => "4.1 Compréhension de l'organisation et de son contexte"],
            ["norm_chapter_id" => 4, "sub_chapter_title" => "4.2 Compréhension des besoins et attentes des travailleurs et autres parties intéressées"],
            ["norm_chapter_id" => 4, "sub_chapter_title" => "4.3 Détermination du périmètre du système de management de la SST"],
            ["norm_chapter_id" => 4, "sub_chapter_title" => "4.4 Système de management de la SST"],
            
            ["norm_chapter_id" => 5, "sub_chapter_title" => "5.1 Leadership et engagement"],
            ["norm_chapter_id" => 5, "sub_chapter_title" => "5.2 Politique SST"],
            ["norm_chapter_id" => 5, "sub_chapter_title" => "5.3 Rôles, responsabilités et autorités au sein de l'organisation"],
            ["norm_chapter_id" => 5, "sub_chapter_title" => "5.4 Consultation et participation des travailleurs"],
            
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.1.1 Généralités"],
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.1.2 Identification des dangers et évaluation des risques et opportunités"],
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.1.3 Détermination des exigences légales et autres exigences"],
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.1.4 Planification des actions"],
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.2.1 Objectifs de SST"],
            ["norm_chapter_id" => 6, "sub_chapter_title" => "6.2.2 Planification pour atteindre les objectifs de SST"],
            
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.1 Ressources"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.2 Compétences"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.3 Sensibilisation"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.4.1 Généralités"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.4.2 Communication interne"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.4.3 Communication externe"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.5.1 Généralités"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.5.2 Création et mise à jour"],
            ["norm_chapter_id" => 7, "sub_chapter_title" => "7.5.3 Maîtrise des informations documentées"],
            
            ["norm_chapter_id" => 8, "sub_chapter_title" => "8.1.1 Généralités"],
            ["norm_chapter_id" => 8, "sub_chapter_title" => "8.1.2 Élimination des dangers et réduction des risques"],
            ["norm_chapter_id" => 8, "sub_chapter_title" => "8.1.3 Gestion du changement"],
            ["norm_chapter_id" => 8, "sub_chapter_title" => "8.1.4 Approvisionnement"],
            ["norm_chapter_id" => 8, "sub_chapter_title" => "8.2 Préparation et réponse aux situations d'urgence"],
            
            ["norm_chapter_id" => 9, "sub_chapter_title" => "9.1.1 Généralités"],
            ["norm_chapter_id" => 9, "sub_chapter_title" => "9.1.2 Évaluation de la conformité"],
            ["norm_chapter_id" => 9, "sub_chapter_title" => "9.2.1 Généralités"],
            ["norm_chapter_id" => 9, "sub_chapter_title" => "9.2.2 Programme d'audit interne"],
            ["norm_chapter_id" => 9, "sub_chapter_title" => "9.3 Revue de direction"],
            
            ["norm_chapter_id" => 10, "sub_chapter_title" => "10.1 Généralités"],
            ["norm_chapter_id" => 10, "sub_chapter_title" => "10.2 Incidents, non-conformités et actions correctives"],
            ["norm_chapter_id" => 10, "sub_chapter_title" => "10.3 Amélioration continue"]
        ];

        $currentTime = now();

        foreach ($normSubChapters as $normSubChapter) {
            NormSubChapter::create([
                'norm_chapter_id' => $normSubChapter['norm_chapter_id'],
                'sub_chapter_title' => $normSubChapter['sub_chapter_title'],
                'created_at' => $currentTime,
                'updated_at' => $currentTime
            ]);
        }
    }
}
