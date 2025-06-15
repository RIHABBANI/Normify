<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CarteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all rak IDs
        $raks = DB::table('raks')->get();
        
        $cartes = [];
        $carteTypes = ['COM-G', 'MAU-G', 'AUSN-G', 'COM-D', 'MAU-D', 'AUSN-D'];
        $statuses = ['fonctionnel', 'en panne', 'en maintenance', 'hors service'];
        
        // Sample card references from the SQL
        $references = [
            'EL 07-00182', 'CL 072691781', 'ICT 4604167', 'EL 06-00215', 'CL 04358133',
            'EP 1205023', 'EP 0506109', 'CL 082691009', 'EP 0506142', 'EL 07-00233',
            'EL 00-00425', 'ICT 0505326', 'EL 07-00234', 'SCK 00-00-090006', 'EP 0506089',
            '400775066', 'EL 00-00117', 'ICT 2105005', 'EP 2306055', 'EL 00-00178',
            'SCK 05-00-090024', 'EP 0905010', 'CL 073790051', 'EP 1205092', 'CL 030514076',
            'GEBI-07-11-0002', 'EP 0505332', 'CL 050802250', 'EL 05-00001', 'EP 1205022',
            'SCK 06-00-080140', 'SAT 22/10', 'EP 4007062', 'EL 07-00231', 'EL 00-00182',
            'EP 4705060', 'CL 044614354', 'CL 043908499', 'EP 4705053', 'SCK 06-00-080228',
            'CL 073790072', 'EP 0505124', 'EP 0805006', 'SCK 00-00-080011', 'ICT 0505302',
            'EL 07-00230', 'CL 072691653', 'ICT 0505321', 'EP 1405011', 'SCK 00-00-090023',
            'EP 47507110', 'CL 0524201214', 'GEBI-18-11-00013', 'EP 0505355', 'SCK 06-00-100028',
            'AC 04210417', 'EP 4307105', 'SCK 06-AN-130034', 'CL 073790032', 'EP 0505356',
            'EP 2208037', 'CL 043908782', 'ICT 4405012', 'EP 2208032', 'CL 030511176',
            'EP 1205088', 'EL 07-00223', 'EL 00-00183', 'SCK 05-AN-130046', 'EL 07-00222',
            'EL 00-00730', 'ICT 4604011', 'SCK 06-00-080019', 'CL 054700771', 'ICT 2105004'
        ];

        foreach ($raks as $rak) {
            // Create 3 cards per rak (COM, MAU, AUSN) for each side (G and D)
            foreach (['G', 'D'] as $side) {
                foreach (['COM', 'MAU', 'AUSN'] as $type) {
                    $reference = $references[array_rand($references)] ?? 'REF-' . rand(100000, 999999);
                    $status = $statuses[array_rand($statuses)];
                    // Most cards are functional
                    if (rand(1, 10) <= 8) {
                        $status = 'fonctionnel';
                    }
                    
                    $cartes[] = [
                        'ID_RAK' => $rak->id,
                        'REFERENCE_CARTE' => $reference,
                        'NOM_CARTE' => $type . '-' . $side,
                        'STATU_CARTE' => $status,
                        'created_at' => Carbon::now()->subDays(rand(1, 30)),
                        'updated_at' => Carbon::now()->subDays(rand(0, 10)),
                    ];
                }
            }
        }

        // Insert all cards
        DB::table('cartes')->insert($cartes);
    }
}
