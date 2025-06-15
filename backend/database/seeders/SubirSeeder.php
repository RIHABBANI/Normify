<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SubirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some carte and panne IDs
        $cartes = DB::table('cartes')->where('STATU_CARTE', '!=', 'fonctionnel')->pluck('id')->toArray();
        $pannes = DB::table('pannes')->pluck('id')->toArray();
        
        $subirs = [];
        
        // Create relationships between cards and failures
        foreach ($cartes as $carteId) {
            // Each non-functional card has 1-3 associated failures
            $numberOfFailures = rand(1, 3);
            $selectedPannes = array_rand(array_flip($pannes), min($numberOfFailures, count($pannes)));
            
            if (!is_array($selectedPannes)) {
                $selectedPannes = [$selectedPannes];
            }
            
            foreach ($selectedPannes as $panneId) {
                $subirs[] = [
                    'ID_CARTE' => $carteId,
                    'ID_PANNE' => $panneId,
                    'created_at' => Carbon::now()->subDays(rand(1, 30)),
                    'updated_at' => Carbon::now()->subDays(rand(0, 10)),
                ];
            }
        }

        // Insert all relationships
        if (!empty($subirs)) {
            DB::table('subirs')->insert($subirs);
        }
    }
}
