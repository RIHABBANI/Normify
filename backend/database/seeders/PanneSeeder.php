<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PanneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pannes = [
            [
                'DESCRIPTION_PANNE' => 'Défaillance du module de communication principale',
                'GRAVITE_PANNE' => 'Critique',
            ],
            [
                'DESCRIPTION_PANNE' => 'Surchauffe du système électronique',
                'GRAVITE_PANNE' => 'Élevée',
            ],
            [
                'DESCRIPTION_PANNE' => 'Court-circuit sur carte d\'alimentation',
                'GRAVITE_PANNE' => 'Critique',
            ],
            [
                'DESCRIPTION_PANNE' => 'Dysfonctionnement intermittent des capteurs',
                'GRAVITE_PANNE' => 'Moyenne',
            ],
            [
                'DESCRIPTION_PANNE' => 'Perte de signal réseau',
                'GRAVITE_PANNE' => 'Élevée',
            ],
            [
                'DESCRIPTION_PANNE' => 'Usure prématurée des connecteurs',
                'GRAVITE_PANNE' => 'Faible',
            ],
            [
                'DESCRIPTION_PANNE' => 'Défaut d\'isolation électrique',
                'GRAVITE_PANNE' => 'Critique',
            ],
            [
                'DESCRIPTION_PANNE' => 'Problème de synchronisation des modules',
                'GRAVITE_PANNE' => 'Moyenne',
            ],
            [
                'DESCRIPTION_PANNE' => 'Corruption de données firmware',
                'GRAVITE_PANNE' => 'Élevée',
            ],
            [
                'DESCRIPTION_PANNE' => 'Défaillance du système de refroidissement',
                'GRAVITE_PANNE' => 'Élevée',
            ],
            [
                'DESCRIPTION_PANNE' => 'Vibrations excessives causant des déconnexions',
                'GRAVITE_PANNE' => 'Moyenne',
            ],
            [
                'DESCRIPTION_PANNE' => 'Accumulation de poussière dans les circuits',
                'GRAVITE_PANNE' => 'Faible',
            ],
            [
                'DESCRIPTION_PANNE' => 'Défaut d\'étanchéité causant l\'humidité',
                'GRAVITE_PANNE' => 'Moyenne',
            ],
            [
                'DESCRIPTION_PANNE' => 'Surcharge électrique temporaire',
                'GRAVITE_PANNE' => 'Élevée',
            ],
            [
                'DESCRIPTION_PANNE' => 'Obsolescence des composants électroniques',
                'GRAVITE_PANNE' => 'Faible',
            ]
        ];

        foreach ($pannes as $panne) {
            DB::table('pannes')->insert([
                'DESCRIPTION_PANNE' => $panne['DESCRIPTION_PANNE'],
                'GRAVITE_PANNE' => $panne['GRAVITE_PANNE'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
