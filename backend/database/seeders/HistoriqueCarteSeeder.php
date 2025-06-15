<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HistoriqueCarteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all carte IDs
        $cartes = DB::table('cartes')->pluck('id')->toArray();
        
        $historiques = [];
        
        foreach ($cartes as $carteId) {
            // Each card has an installation history
            $historiques[] = [
                'ID_CARTE' => $carteId,
                'STATUS' => 'installee',
                'created_at' => Carbon::now()->subDays(rand(1, 90)),
                'updated_at' => Carbon::now()->subDays(rand(1, 90)),
            ];
            
            // Some cards might have been removed and reinstalled
            if (rand(1, 10) <= 2) { // 20% chance
                $historiques[] = [
                    'ID_CARTE' => $carteId,
                    'STATUS' => 'retirée',
                    'created_at' => Carbon::now()->subDays(rand(10, 60)),
                    'updated_at' => Carbon::now()->subDays(rand(10, 60)),
                ];
                
                $historiques[] = [
                    'ID_CARTE' => $carteId,
                    'STATUS' => 'installee',
                    'created_at' => Carbon::now()->subDays(rand(1, 10)),
                    'updated_at' => Carbon::now()->subDays(rand(1, 10)),
                ];
            }
        }

        // Insert all history records
        DB::table('historique_cartes')->insert($historiques);
    }
}
