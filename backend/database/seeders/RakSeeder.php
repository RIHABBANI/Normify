<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get rame IDs based on NUMERO_RAME
        $rameIds = DB::table('rames')->pluck('id', 'NUMERO_RAME')->toArray();

        $raks = [
            ['ID_RAME' => $rameIds['102'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 17'],
            ['ID_RAME' => $rameIds['102'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 38'],
            ['ID_RAME' => $rameIds['103'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 14'],
            ['ID_RAME' => $rameIds['103'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 46'],
            ['ID_RAME' => $rameIds['104'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 37'],
            ['ID_RAME' => $rameIds['104'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 48'],
            ['ID_RAME' => $rameIds['105'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 12'],
            ['ID_RAME' => $rameIds['105'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 29'],
            ['ID_RAME' => $rameIds['106'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 5'],
            ['ID_RAME' => $rameIds['106'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 23'],
            ['ID_RAME' => $rameIds['108'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 28'],
            ['ID_RAME' => $rameIds['108'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 222'],
            ['ID_RAME' => $rameIds['109'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 1'],
            ['ID_RAME' => $rameIds['109'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 34'],
            ['ID_RAME' => $rameIds['110'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 7'],
            ['ID_RAME' => $rameIds['110'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 251'],
            ['ID_RAME' => $rameIds['111'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 11'],
            ['ID_RAME' => $rameIds['111'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 316'],
            ['ID_RAME' => $rameIds['112'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 33'],
            ['ID_RAME' => $rameIds['112'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 26'],
            ['ID_RAME' => $rameIds['113'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 15'],
            ['ID_RAME' => $rameIds['113'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 35'],
            ['ID_RAME' => $rameIds['114'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 45'],
            ['ID_RAME' => $rameIds['114'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 20'],
            ['ID_RAME' => $rameIds['115'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 13'],
            ['ID_RAME' => $rameIds['115'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 31'],
            ['ID_RAME' => $rameIds['116'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 8'],
            ['ID_RAME' => $rameIds['116'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 44'],
            ['ID_RAME' => $rameIds['117'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 9'],
            ['ID_RAME' => $rameIds['117'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 0101'],
            ['ID_RAME' => $rameIds['118'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 10'],
            ['ID_RAME' => $rameIds['118'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 39'],
            ['ID_RAME' => $rameIds['120'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 32'],
            ['ID_RAME' => $rameIds['120'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 02'],
            ['ID_RAME' => $rameIds['121'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 04'],
            ['ID_RAME' => $rameIds['121'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 22'],
            ['ID_RAME' => $rameIds['124'], 'MOTRICE' => 'M', 'NOM_RAK' => 'GTW 25'],
            ['ID_RAME' => $rameIds['124'], 'MOTRICE' => 'MH', 'NOM_RAK' => 'GTW 50'],
        ];

        foreach ($raks as $rak) {
            DB::table('raks')->insert([
                'ID_RAME' => $rak['ID_RAME'],
                'MOTRICE' => $rak['MOTRICE'],
                'NOM_RAK' => $rak['NOM_RAK'],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
