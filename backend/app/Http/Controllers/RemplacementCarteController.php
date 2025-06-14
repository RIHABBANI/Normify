<?php

namespace App\Http\Controllers;

use App\Models\RemplacementCarte;
use App\Models\Carte;
use App\Models\Rak;
use App\Models\Rame;
use App\Models\HistoriqueCarte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RemplacementCarteController extends Controller
{
    public function index()
    {
        $remplacements = RemplacementCarte::with(['carteAncienne', 'carteNouvelle'])->get();
        return response()->json($remplacements);
    }    public function store(Request $request)
    {        // Validate main fields
        $validationRules = [
            'ID_CARTE_ANCIENNE' => 'required|exists:cartes,id',
            'DATE_REMPLACEMENT' => 'required|date',
            'OBSERVATIONS' => 'nullable|string',
            'replacement_type' => 'required|in:new,existing',
            'RAISON_REMPLACEMENT' => 'required|string|in:en panne,en maintenance,hors service',
            'CAUSE_REMPLACEMENT' => 'nullable|string|max:100'
        ];// Add validation rules based on replacement type
        if ($request->replacement_type === 'new') {
            $validationRules['REFERENCE_CARTE'] = 'required|string|max:225';
            $validationRules['NOM_CARTE'] = 'nullable|string|max:100';
            $validationRules['STATU_CARTE'] = 'required|string|max:50';
        } else {
            $validationRules['ID_CARTE_NOUVELLE'] = 'required|exists:cartes,id';
        }

        $validated = $request->validate($validationRules);
        
        try {
            DB::beginTransaction();

            // Get the old carte to find its RAK
            $oldCarte = Carte::findOrFail($validated['ID_CARTE_ANCIENNE']);
              $nouvelleCarte = null;              if ($validated['replacement_type'] === 'new') {
                // Create the new carte in the same RAK as the old carte
                $nouvelleCarte = Carte::create([
                    'ID_RAK' => $oldCarte->ID_RAK,
                    'REFERENCE_CARTE' => $validated['REFERENCE_CARTE'],
                    'NOM_CARTE' => $validated['NOM_CARTE'] ?? null,
                    'STATU_CARTE' => $validated['STATU_CARTE']
                ]);
            } else {
                // Use existing carte
                $nouvelleCarte = Carte::findOrFail($validated['ID_CARTE_NOUVELLE']);
            }
            
            // Always mark old carte as "hors service" regardless of replacement type
            // The RAISON_REMPLACEMENT indicates why it was replaced (en panne, en maintenance, etc.)
            $oldCarte->update([
                'STATU_CARTE' => 'hors service'
            ]);
              // Create the replacement with reason included in observations
            $observations = $validated['OBSERVATIONS'] ?? '';
            if (!empty($observations)) {
                $observations = "Raison: " . $validated['RAISON_REMPLACEMENT'] . " | " . $observations;
            } else {
                $observations = "Raison: " . $validated['RAISON_REMPLACEMENT'];
            }
              // Create the replacement with reason included in observations
            $observations = $validated['OBSERVATIONS'] ?? '';
            if (!empty($observations)) {
                $observations = "Raison: " . $validated['RAISON_REMPLACEMENT'] . " | " . $observations;
            } else {
                $observations = "Raison: " . $validated['RAISON_REMPLACEMENT'];
            }
              $remplacement = RemplacementCarte::create([
                'ID_CARTE_ANCIENNE' => $validated['ID_CARTE_ANCIENNE'],
                'ID_CARTE_NOUVELLE' => $nouvelleCarte->id,
                'DATE_REMPLACEMENT' => $validated['DATE_REMPLACEMENT'],
                'OBSERVATIONS' => $observations,
                'CAUSE_REMPLACEMENT' => $validated['CAUSE_REMPLACEMENT'] ?? null
            ]);

            // Create historique_carte entries
            // Old carte as "retiree"
            HistoriqueCarte::create([
                'ID_CARTE' => $oldCarte->id,
                'STATUS' => 'retirée'
            ]);

            // New carte as "installee"
            HistoriqueCarte::create([
                'ID_CARTE' => $nouvelleCarte->id,
                'STATUS' => 'installee'
            ]);
            
            DB::commit();
            
            // Load relationships and return
            $remplacement->load(['carteAncienne', 'carteNouvelle']);
            return response()->json($remplacement, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Failed to create replacement: ' . $e->getMessage()], 500);
        }
    }

    public function show(RemplacementCarte $remplacementCarte)
    {
        return response()->json($remplacementCarte->load(['carteAncienne', 'carteNouvelle']));
    }

    public function update(Request $request, RemplacementCarte $remplacementCarte)
    {
        $validated = $request->validate([
            'ID_CARTE_ANCIENNE' => 'sometimes|exists:cartes,id',
            'ID_CARTE_NOUVELLE' => 'sometimes|exists:cartes,id',
            'DATE_REMPLACEMENT' => 'sometimes|date',
            'OBSERVATIONS' => 'nullable|string'
        ]);

        $remplacementCarte->update($validated);
        return response()->json($remplacementCarte);
    }

    public function destroy(RemplacementCarte $remplacementCarte)
    {
        $remplacementCarte->delete();
        return response()->json(null, 204);
    }   
    public function getRemplacementsByRame($rameId)
    {
        // Get all raks belonging to the rame
        $raks = Rak::where('ID_RAME', $rameId)->pluck('id');
        
        // Get all cartes belonging to these raks
        $cartes = Carte::whereIn('ID_RAK', $raks)->pluck('id');
        
        // Get all replacements where either the old or new card belongs to the rame
        $remplacements = RemplacementCarte::where(function($query) use ($cartes) {
            $query->whereIn('ID_CARTE_ANCIENNE', $cartes)
                  ->orWhereIn('ID_CARTE_NOUVELLE', $cartes);
        })
        ->with(['carteAncienne.rak', 'carteNouvelle.rak'])
        ->orderBy('DATE_REMPLACEMENT', 'desc')
        ->get();
        
        return response()->json($remplacements);
    }
    
    public function getRemplacementsByCarte($carteId)
    {
        // Get all replacements where either the old or new carte matches the provided ID
        $remplacements = RemplacementCarte::where('ID_CARTE_ANCIENNE', $carteId)
            ->orWhere('ID_CARTE_NOUVELLE', $carteId)
            ->with([
                'carteAncienne.rak.rame',
                'carteNouvelle.rak.rame',
                'user'
            ])
            ->orderBy('DATE_REMPLACEMENT', 'desc')
            ->get();        
        return response()->json($remplacements);
    }

    /**
     * Get available cartes by RAK for existing carte selection
     */
    public function getCartesByRak($rakId)
    {
        $cartes = Carte::where('ID_RAK', $rakId)
            ->where('STATU_CARTE', '!=', 'hors service')
            ->with(['rak.rame'])
            ->get();
        
        return response()->json($cartes);
    }
}
