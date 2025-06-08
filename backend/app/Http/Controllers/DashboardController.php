<?php

namespace App\Http\Controllers;

use App\Models\Carte;
use App\Models\Rak;
use App\Models\Rame;
use App\Models\RemplacementCarte;
use App\Models\HistoriqueCarte;
use App\Models\Maintenance;
use App\Models\Panne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{    /**
     * Get dashboard statistics for the rail maintenance system
     */
    public function getStats(Request $request)
    {
        // Get date filters from request
        $startDate = $request->get('start_date', Carbon::now()->subYear()->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->format('Y-m-d'));

        try {            // Get basic counts (overall system stats - not filtered by date as they represent current state)
            $totalRames = Rame::count();
            $totalRaks = Rak::count();
            $totalCartes = Carte::count();
            $totalRemplacements = RemplacementCarte::whereBetween('DATE_REMPLACEMENT', [$startDate, $endDate])->count();

            // Get count of cartes that had activity in the filtered period
            $activeCartesInPeriod = DB::selectOne("
                SELECT COUNT(DISTINCT c.id) as count
                FROM cartes c
                WHERE c.id IN (
                    SELECT DISTINCT ID_CARTE_ANCIENNE FROM remplacement_cartes 
                    WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                    UNION
                    SELECT DISTINCT ID_CARTE_NOUVELLE FROM remplacement_cartes 
                    WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                )
                OR c.updated_at BETWEEN ? AND ?
            ", [$startDate, $endDate, $startDate, $endDate, $startDate, $endDate])->count;// Get carte status distribution (for cartes that had activity in the date range)
            $carteStatusDistribution = DB::select("
                SELECT 
                    c.STATU_CARTE,
                    COUNT(*) as count
                FROM cartes c
                WHERE c.id IN (
                    SELECT DISTINCT ID_CARTE_ANCIENNE FROM remplacement_cartes 
                    WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                    UNION
                    SELECT DISTINCT ID_CARTE_NOUVELLE FROM remplacement_cartes 
                    WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                )
                OR c.updated_at BETWEEN ? AND ?
                GROUP BY c.STATU_CARTE
            ", [$startDate, $endDate, $startDate, $endDate, $startDate, $endDate]);

            // Convert to collection and key by status
            $carteStatusDistribution = collect($carteStatusDistribution)->keyBy('STATU_CARTE');

            // Calculate operational efficiency based on filtered data
            $fonctionnelCount = $carteStatusDistribution->get('Fonctionnel')->count ?? 0;
            $totalFilteredCartes = $carteStatusDistribution->sum('count');
            $operationalEfficiency = $totalFilteredCartes > 0 ? round(($fonctionnelCount / $totalFilteredCartes) * 100, 2) : 0;

            // Get replacement trends by rame within date range
            $replacementsByRame = DB::select("
                SELECT 
                    ra.NUMERO_RAME,
                    ra.TYPE_RAME,
                    YEAR(rc.DATE_REMPLACEMENT) as year,
                    MONTH(rc.DATE_REMPLACEMENT) as month,
                    COUNT(*) as count
                FROM remplacement_cartes rc
                JOIN cartes c ON rc.ID_CARTE_ANCIENNE = c.id
                JOIN raks r ON c.ID_RAK = r.id
                JOIN rames ra ON r.ID_RAME = ra.id
                WHERE rc.DATE_REMPLACEMENT BETWEEN ? AND ?
                GROUP BY ra.id, ra.NUMERO_RAME, ra.TYPE_RAME, year, month
                ORDER BY ra.NUMERO_RAME, year DESC, month DESC
            ", [$startDate, $endDate]);            // Get carte status distribution by rame (filtered by date range activity)
            $carteStatusByRame = DB::select("
                SELECT 
                    ra.id as rame_id,
                    ra.NUMERO_RAME,
                    ra.TYPE_RAME,
                    c.STATU_CARTE,
                    COUNT(*) as count
                FROM rames ra
                LEFT JOIN raks r ON ra.id = r.ID_RAME
                LEFT JOIN cartes c ON r.id = c.ID_RAK
                WHERE c.STATU_CARTE IS NOT NULL
                AND (
                    c.id IN (
                        SELECT DISTINCT ID_CARTE_ANCIENNE FROM remplacement_cartes 
                        WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                    )
                    OR c.id IN (
                        SELECT DISTINCT ID_CARTE_NOUVELLE FROM remplacement_cartes 
                        WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                    )
                    OR c.updated_at BETWEEN ? AND ?
                )
                GROUP BY ra.id, ra.NUMERO_RAME, ra.TYPE_RAME, c.STATU_CARTE
                ORDER BY ra.NUMERO_RAME, c.STATU_CARTE
            ", [$startDate, $endDate, $startDate, $endDate, $startDate, $endDate]);            // Get recent activity (filtered by date range)
            $recentReplacements = RemplacementCarte::with([
                    'carteAncienne:id,REFERENCE_CARTE,ID_RAK',
                    'carteAncienne.rak:id,NOM_RAK,ID_RAME',
                    'carteAncienne.rak.rame:id,NUMERO_RAME',
                    'carteNouvelle:id,REFERENCE_CARTE'
                ])
                ->whereBetween('DATE_REMPLACEMENT', [$startDate, $endDate])
                ->orderBy('DATE_REMPLACEMENT', 'desc')
                ->limit(10)
                ->get();

            // Get maintenance alerts (upcoming maintenances in next 30 days)
            $upcomingMaintenances = Rame::where('PROCHAINE_MAINTENANCE', '<=', Carbon::now()->addDays(30))
                ->where('PROCHAINE_MAINTENANCE', '>=', Carbon::now())
                ->orderBy('PROCHAINE_MAINTENANCE')
                ->get(['id', 'NUMERO_RAME', 'TYPE_RAME', 'PROCHAINE_MAINTENANCE']);            // Get failure rate by month (filtered by date range)
            $monthlyFailures = Carte::select(
                    DB::raw('YEAR(updated_at) as year'),
                    DB::raw('MONTH(updated_at) as month'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereIn('STATU_CARTE', ['En panne', 'hors service'])
                ->whereBetween('updated_at', [$startDate, $endDate])
                ->groupBy('year', 'month')
                ->orderBy('year', 'desc')
                ->orderBy('month', 'desc')
                ->get();// Get motrice distribution
            $motriceDistribution = Rak::select('MOTRICE', DB::raw('count(*) as count'))
                ->groupBy('MOTRICE')
                ->get()
                ->keyBy('MOTRICE');

            // Get monthly replacements for trend analysis
            $monthlyReplacements = DB::select("
                SELECT 
                    YEAR(DATE_REMPLACEMENT) as year,
                    MONTH(DATE_REMPLACEMENT) as month,
                    COUNT(*) as count
                FROM remplacement_cartes
                WHERE DATE_REMPLACEMENT BETWEEN ? AND ?
                GROUP BY YEAR(DATE_REMPLACEMENT), MONTH(DATE_REMPLACEMENT)
                ORDER BY year DESC, month DESC
                LIMIT 12
            ", [$startDate, $endDate]);

            // Get rak status distribution (based on their cartes)
            $rakStatusStats = DB::select("
                SELECT 
                    r.id,
                    r.NOM_RAK,
                    r.MOTRICE,
                    COUNT(c.id) as total_cartes,
                    SUM(CASE WHEN c.STATU_CARTE = 'Fonctionnel' THEN 1 ELSE 0 END) as fonctionnel_count,
                    SUM(CASE WHEN c.STATU_CARTE = 'En panne' THEN 1 ELSE 0 END) as en_panne_count,
                    SUM(CASE WHEN c.STATU_CARTE = 'En maintenance' THEN 1 ELSE 0 END) as en_maintenance_count,
                    SUM(CASE WHEN c.STATU_CARTE = 'hors service' THEN 1 ELSE 0 END) as hors_service_count
                FROM raks r
                LEFT JOIN cartes c ON r.id = c.ID_RAK
                GROUP BY r.id, r.NOM_RAK, r.MOTRICE
            ");            return response()->json([
                'overview' => [
                    'total_rames' => $totalRames,
                    'total_raks' => $totalRaks,
                    'total_cartes' => $totalCartes,
                    'active_cartes_in_period' => $activeCartesInPeriod,
                    'total_remplacements' => $totalRemplacements,
                    'operational_efficiency' => $operationalEfficiency
                ],
                'carte_status_distribution' => $carteStatusDistribution,
                'replacements_by_rame' => $replacementsByRame,
                'carte_status_by_rame' => $carteStatusByRame,
                'recent_activity' => $recentReplacements,
                'upcoming_maintenances' => $upcomingMaintenances,
                'motrice_distribution' => $motriceDistribution,
                'monthly_replacements' => $monthlyReplacements,
                'rak_status_stats' => $rakStatusStats,
                'date_filters' => [
                    'start_date' => $startDate,
                    'end_date' => $endDate
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch dashboard statistics: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get performance metrics for specific time period
     */
    public function getPerformanceMetrics(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->subMonths(6));
        $endDate = $request->get('end_date', Carbon::now());

        try {
            // Calculate MTBF (Mean Time Between Failures) - simplified version
            $totalOperationalHours = Carbon::parse($startDate)->diffInHours($endDate) * Carte::where('STATU_CARTE', 'Fonctionnel')->count();
            $totalFailures = RemplacementCarte::whereBetween('DATE_REMPLACEMENT', [$startDate, $endDate])->count();
            $mtbf = $totalFailures > 0 ? round($totalOperationalHours / $totalFailures, 2) : 0;

            // Calculate availability percentage
            $totalCartes = Carte::count();
            $availableCartes = Carte::where('STATU_CARTE', 'Fonctionnel')->count();
            $availability = $totalCartes > 0 ? round(($availableCartes / $totalCartes) * 100, 2) : 0;

            // Get replacement rate trend
            $replacementRate = RemplacementCarte::whereBetween('DATE_REMPLACEMENT', [$startDate, $endDate])
                ->selectRaw('DATE(DATE_REMPLACEMENT) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            return response()->json([
                'mtbf_hours' => $mtbf,
                'availability_percentage' => $availability,
                'replacement_rate_trend' => $replacementRate,
                'period' => [
                    'start' => $startDate,
                    'end' => $endDate
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch performance metrics: ' . $e->getMessage()], 500);
        }
    }
}
