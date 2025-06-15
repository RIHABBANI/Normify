<?php

namespace Database\Seeders;

use App\Models\RemplacementCarte;
use App\Models\Carte;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RemplacementCarteSeeder extends Seeder
{
    public function run()
    {
        // Get some cartes to use for replacements
        $cartes = Carte::all();
        
        if ($cartes->count() < 4) {
            return; // Need at least 4 cartes for realistic replacements
        }

        $causes = [
            'Surtension / polarité inversée',
            'Mémoire Flash défectueuse',
            'RAM défectueuse',
            'Port RS232 / TTL HS',
            'MVBC défaillant',
            'Firmware corrompu',
            'Relais défectueux',
            'Court-circuit mal géré',
            'ESD sur entrées',
            'Usure / oxydation',
            'Surchauffe excessive',
            'Vibrations mécaniques',
            'Humidité / corrosion',
            'Défaut d\'alimentation',
            'Vieillissement composants'
        ];

        $observations = [
            'Remplacement préventif selon planning de maintenance',
            'Carte défaillante suite à court-circuit détecté',
            'Intervention d\'urgence - panne critique système',
            'Maintenance corrective - dysfonctionnement intermittent',
            'Remplacement suite à surchauffe excessive',
            'Mise à niveau technologique - amélioration performance',
            'Carte endommagée lors d\'opération de maintenance',
            'Défaillance liée aux conditions environnementales',
            'Remplacement suite à diagnostic approfondi',
            'Intervention programmée - fin de vie composant'
        ];

        // Create realistic replacement data
        for ($i = 0; $i < 35; $i++) {
            $carteAncienne = $cartes->random();
            // Try to get a card of the same type for replacement
            $sameName = $cartes->where('NOM_CARTE', $carteAncienne->NOM_CARTE)
                             ->where('id', '!=', $carteAncienne->id);
            
            $carteNouvelle = $sameName->count() > 0 ? $sameName->random() : 
                           $cartes->where('id', '!=', $carteAncienne->id)->random();
            
            $dateRemplacement = Carbon::now()->subDays(rand(1, 180));
            
            $replacement = RemplacementCarte::create([
                'ID_CARTE_ANCIENNE' => $carteAncienne->id,
                'ID_CARTE_NOUVELLE' => $carteNouvelle->id,
                'DATE_REMPLACEMENT' => $dateRemplacement->format('Y-m-d'),
                'CAUSE_REMPLACEMENT' => $causes[array_rand($causes)],
                'OBSERVATIONS' => $observations[array_rand($observations)]
            ]);

            // Update the old card status based on replacement cause
            $statusMapping = [
                'Surtension / polarité inversée' => 'hors service',
                'Mémoire Flash défectueuse' => 'en panne',
                'RAM défectueuse' => 'en panne',
                'Port RS232 / TTL HS' => 'hors service',
                'MVBC défaillant' => 'en panne',
                'Firmware corrompu' => 'en maintenance',
                'Relais défectueux' => 'en panne',
                'Court-circuit mal géré' => 'hors service',
                'ESD sur entrées' => 'hors service',
                'Usure / oxydation' => 'en maintenance',
                'Surchauffe excessive' => 'hors service',
                'Vibrations mécaniques' => 'en maintenance',
                'Humidité / corrosion' => 'en panne',
                'Défaut d\'alimentation' => 'en panne',
                'Vieillissement composants' => 'en maintenance'
            ];

            $newStatus = $statusMapping[$replacement->CAUSE_REMPLACEMENT] ?? 'en panne';
            
            // Update the old card status
            DB::table('cartes')
                ->where('id', $carteAncienne->id)
                ->update([
                    'STATU_CARTE' => $newStatus,
                    'updated_at' => $dateRemplacement
                ]);
        }
    }
}