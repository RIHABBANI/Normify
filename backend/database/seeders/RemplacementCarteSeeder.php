<?php

namespace Database\Seeders;

use App\Models\RemplacementCarte;
use App\Models\Carte;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RemplacementCarteSeeder extends Seeder
{
    public function run()
    {
        // Get some cartes to use for replacements
        $cartes = Carte::all();
        
        if ($cartes->count() < 2) {
            return; // Need at least 2 cartes for replacements
        }        $causes = [
            'Surtension / polarité inversée',
            'Mémoire Flash défectueuse',
            'RAM défectueuse',
            'Port RS232 / TTL HS',
            'MVBC défaillant',
            'Firmware corrompu',
            'Relais défectueux',
            'Court-circuit mal géré',
            'ESD sur entrées',
            'Usure / oxydation'
        ];

        // Create sample replacement data
        for ($i = 0; $i < 20; $i++) {
            $carteAncienne = $cartes->random();
            $carteNouvelle = $cartes->where('id', '!=', $carteAncienne->id)->random();
            
            RemplacementCarte::create([
                'ID_CARTE_ANCIENNE' => $carteAncienne->id,
                'ID_CARTE_NOUVELLE' => $carteNouvelle->id,
                'DATE_REMPLACEMENT' => Carbon::now()->subDays(rand(1, 365))->format('Y-m-d'),
                'OBSERVATIONS' => 'Remplacement automatique généré par le seeder',
                'CAUSE_REMPLACEMENT' => $causes[array_rand($causes)]
            ]);
        }
    }
}