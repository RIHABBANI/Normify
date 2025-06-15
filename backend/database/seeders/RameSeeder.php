<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rames = [
            ['NUMERO_RAME' => '101', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '102', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '103', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '104', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '105', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '106', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '108', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '109', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '110', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '111', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '112', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '113', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '114', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '115', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '116', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '117', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '118', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '119', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '120', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '121', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '122', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
            ['NUMERO_RAME' => '124', 'TYPE_RAME' => 'Z2M', 'DERNIERE_MAINTENANCE' => '2025-06-05', 'PROCHAINE_MAINTENANCE' => '2025-07-06'],
        ];

        foreach ($rames as $rame) {
            DB::table('rames')->insert([
                'NUMERO_RAME' => $rame['NUMERO_RAME'],
                'TYPE_RAME' => $rame['TYPE_RAME'],
                'DERNIERE_MAINTENANCE' => $rame['DERNIERE_MAINTENANCE'],
                'PROCHAINE_MAINTENANCE' => $rame['PROCHAINE_MAINTENANCE'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
