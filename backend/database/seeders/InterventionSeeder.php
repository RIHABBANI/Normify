<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class InterventionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $interventions = [
            [
                'DATE_INTERVENTION' => '2025-06-22',
                'MOTIF' => 'COM',
                'TRAVAUX' => '• Défaut de lecture des nœuds des : Z2M114 et 101 ayant assuré 4 TNR qui ont subi un retard moyen de 10 mn et 6 autres TNR ont subi un retard moyen de 5 mn.
Disjonction avec difficulté de réarmement de la Z2M108 du TNR 3 qui a prolongé son stationnement à la halte de Salé Ville et à Salé Tabriquet et a cumulé 6 mn de retard. Le TNR 14 a subi 6 mn de retard.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-21',
                'MOTIF' => 'Réparation carte MAU',
                'TRAVAUX' => 'Remplacement de la carte MAU défectueuse sur la rame 105. Diagnostic complet effectué, identification d\'un court-circuit au niveau du module de puissance. Installation d\'une nouvelle carte et tests de validation réussis. Durée d\'intervention : 3 heures.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-19',
                'MOTIF' => 'Maintenance préventive AUSN',
                'TRAVAUX' => 'Maintenance préventive sur les cartes AUSN de la rame 112. Vérification des connexions, nettoyage des composants, mise à jour du firmware et calibrage des capteurs. Remplacement préventif de 3 condensateurs montrant des signes d\'usure.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-17',
                'MOTIF' => 'Dépannage système COM',
                'TRAVAUX' => 'Intervention d\'urgence sur la rame 120 pour résoudre une panne de communication. Remplacement du module de transmission défaillant et reconfiguration du système de communication. Tests de connectivité réussis avec le centre de contrôle.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-16',
                'MOTIF' => 'Surchauffe carte électronique',
                'TRAVAUX' => 'Résolution du problème de surchauffe sur la rame 116. Installation d\'un système de ventilation amélioré, nettoyage complet du compartiment électronique et remplacement des filtres à air. Monitoring de température pendant 24h pour validation.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-14',
                'MOTIF' => 'Remplacement carte AUSN',
                'TRAVAUX' => 'Remplacement complet de la carte AUSN sur la rame 113 suite à une défaillance critique. Installation d\'une nouvelle carte, configuration des paramètres et tests de fonctionnement de tous les systèmes auxiliaires. Intervention réussie.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-13',
                'MOTIF' => 'Mise à jour firmware',
                'TRAVAUX' => 'Mise à jour du firmware sur toutes les cartes de la rame 119. Installation des dernières versions de sécurité et d\'optimisation. Tests de performance avant et après mise à jour montrant une amélioration de 15% des temps de réponse.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-11',
                'MOTIF' => 'Réparation système freinage',
                'TRAVAUX' => 'Intervention critique sur la rame 121 pour résoudre un dysfonctionnement du système de freinage. Remplacement des cartes COM et MAU défaillantes, recalibrage complet du système et tests de sécurité approfondis. Remise en service après validation complète.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-09',
                'MOTIF' => 'Contrôle qualité',
                'TRAVAUX' => 'Contrôle qualité trimestriel sur la rame 118. Vérification de tous les systèmes, mesure des performances, contrôle de l\'usure des composants et validation de la conformité aux normes de sécurité. Rapport de conformité établi.',
            ],
            [
                'DATE_INTERVENTION' => '2025-06-07',
                'MOTIF' => 'Maintenance corrective',
                'TRAVAUX' => 'Maintenance corrective sur la rame 115 suite à des signalements de dysfonctionnements intermittents. Diagnostic approfondi, remplacement de connecteurs corrodés et optimisation des paramètres de fonctionnement. Tests de fiabilité sur 48h.',
            ]
        ];

        foreach ($interventions as $intervention) {
            DB::table('interventions')->insert([
                'DATE_INTERVENTION' => $intervention['DATE_INTERVENTION'],
                'MOTIF' => $intervention['MOTIF'],
                'TRAVAUX' => $intervention['TRAVAUX'],
                'created_at' => Carbon::parse($intervention['DATE_INTERVENTION']),
                'updated_at' => Carbon::parse($intervention['DATE_INTERVENTION']),
            ]);
        }
    }
}
