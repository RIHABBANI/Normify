<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MaintenanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $maintenances = [
            [
                'DATE_MAINTENANCE' => '2025-06-27',
                'SIGNALEMENT_MAINTENANCE' => '• Défaut de lecture des nœuds des : Z2M114 et 101 ayant assuré 4 TNR qui ont subi un retard moyen de 10 mn et 6 autres TNR ont subi un retard moyen de 5 mn.
Disjonction avec difficulté de réarmement de la Z2M108 du TNR 3 qui a prolongé son stationnement à la halte de Salé Ville et à Salé Tabriquet et a cumulé 6 mn de retard. Le TNR 14 a subi 6 mn de retard.',
                'ANOMALIE_MAINTENANCE' => '• Défaut de lecture des nœuds des : Z2M114 et 101 ayant assuré 4 TNR qui ont subi un retard moyen de 10 mn et 6 autres TNR ont subi un retard moyen de 5 mn.
Disjonction avec difficulté de réarmement de la Z2M108 du TNR 3 qui a prolongé son stationnement à la halte de Salé Ville et à Salé Tabriquet et a cumulé 6 mn de retard. Le TNR 14 a subi 6 mn de retard.',
                'ORGANE_MAINTENANCE' => 'Carte COM',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-20',
                'SIGNALEMENT_MAINTENANCE' => 'Panne récurrente sur la carte MAU-G de la rame 105. Signal d\'erreur intermittent détecté lors des tests de routine. Nécessite une inspection approfondie des connexions et des composants électroniques.',
                'ANOMALIE_MAINTENANCE' => 'Dysfonctionnement intermittent de la carte MAU-G causant des erreurs de communication avec le système central. Connexions électriques instables détectées.',
                'ORGANE_MAINTENANCE' => 'Carte MAU',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-18',
                'SIGNALEMENT_MAINTENANCE' => 'Maintenance préventive programmée pour la rame 112. Vérification des cartes AUSN et remplacement des composants usés selon le planning de maintenance.',
                'ANOMALIE_MAINTENANCE' => 'Usure normale des composants électroniques. Quelques condensateurs montrent des signes de vieillissement prématuré.',
                'ORGANE_MAINTENANCE' => 'Carte AUSN',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-15',
                'SIGNALEMENT_MAINTENANCE' => 'Alerte système détectée sur la rame 120. Problème de communication entre les cartes COM et le système de contrôle central. Interruption du service pendant 15 minutes.',
                'ANOMALIE_MAINTENANCE' => 'Défaillance du module de communication principale. Perte de signal intermittente causant des dysfonctionnements du système de freinage automatique.',
                'ORGANE_MAINTENANCE' => 'Carte COM',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-12',
                'SIGNALEMENT_MAINTENANCE' => 'Inspection de routine révélant une surchauffe sur la carte MAU-D de la rame 116. Température anormalement élevée détectée par les capteurs thermiques.',
                'ANOMALIE_MAINTENANCE' => 'Surchauffe du module de puissance principal. Ventilation insuffisante et accumulation de poussière dans le compartiment électronique.',
                'ORGANE_MAINTENANCE' => 'Carte MAU',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-10',
                'SIGNALEMENT_MAINTENANCE' => 'Maintenance corrective sur la rame 113 suite à un dysfonctionnement des systèmes auxiliaires. Remplacement de la carte AUSN défectueuse et tests de validation.',
                'ANOMALIE_MAINTENANCE' => 'Carte AUSN complètement défaillante. Court-circuit détecté au niveau du module d\'alimentation auxiliaire provoquant l\'arrêt des systèmes secondaires.',
                'ORGANE_MAINTENANCE' => 'Carte AUSN',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-08',
                'SIGNALEMENT_MAINTENANCE' => 'Contrôle qualité hebdomadaire sur la rame 119. Vérification des performances de toutes les cartes électroniques et mise à jour du firmware selon les dernières spécifications.',
                'ANOMALIE_MAINTENANCE' => 'Firmware obsolète détecté sur plusieurs cartes. Performances légèrement dégradées mais dans les limites acceptables.',
                'ORGANE_MAINTENANCE' => 'Carte COM',
            ],
            [
                'DATE_MAINTENANCE' => '2025-06-05',
                'SIGNALEMENT_MAINTENANCE' => 'Intervention d\'urgence sur la rame 121 après signalement d\'un comportement erratique des freins. Diagnostic complet du système de contrôle et remplacement des cartes suspectes.',
                'ANOMALIE_MAINTENANCE' => 'Dysfonctionnement critique du système de freinage causé par une défaillance en cascade des cartes COM et MAU. Risque sécuritaire élevé.',
                'ORGANE_MAINTENANCE' => 'Carte COM',
            ]
        ];

        foreach ($maintenances as $maintenance) {
            DB::table('maintenances')->insert([
                'DATE_MAINTENANCE' => $maintenance['DATE_MAINTENANCE'],
                'SIGNALEMENT_MAINTENANCE' => $maintenance['SIGNALEMENT_MAINTENANCE'],
                'ANOMALIE_MAINTENANCE' => $maintenance['ANOMALIE_MAINTENANCE'],
                'ORGANE_MAINTENANCE' => $maintenance['ORGANE_MAINTENANCE'],
                'created_at' => Carbon::parse($maintenance['DATE_MAINTENANCE']),
                'updated_at' => Carbon::parse($maintenance['DATE_MAINTENANCE']),
            ]);
        }
    }
}
