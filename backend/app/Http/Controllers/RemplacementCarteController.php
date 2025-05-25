<?php

namespace App\Http\Controllers;

use App\Models\RemplacementCarte;
use App\Models\Carte;
use App\Models\Rak;
use App\Models\Rame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RemplacementCarteController extends Controller
{
    public function index()
    {
        $remplacements = RemplacementCarte::with(['carteAncienne', 'carteNouvelle'])->get();
        return response()->json($remplacements);
    }      public function store(Request $request)
    {
        // Validate main fields
        $validated = $request->validate([
            'ID_CARTE_ANCIENNE' => 'required|exists:cartes,id',
            'DATE_REMPLACEMENT' => 'required|date',
            'OBSERVATIONS' => 'nullable|string',
            // For the new carte fields
            'REFERENCE_CARTE' => 'required|string|max:225',
            'STATU_CARTE' => 'required|string|max:50'
        ]);
        
        // Get the old carte to find its RAK
        $oldCarte = Carte::findOrFail($validated['ID_CARTE_ANCIENNE']);
        
        // Create the new carte in the same RAK as the old carte
        $nouvelleCarte = Carte::create([
            'ID_RAK' => $oldCarte->ID_RAK, // Use the same RAK as the old carte
            'REFERENCE_CARTE' => $validated['REFERENCE_CARTE'],
            'STATU_CARTE' => $validated['STATU_CARTE']
        ]);
        
        // Update the status of the old carte to indicate it's no longer in use
        $oldCarte->update([
            'STATU_CARTE' => 'Hors service'
        ]);
        
        // Create the replacement with the new carte ID
        $remplacement = RemplacementCarte::create([
            'ID_CARTE_ANCIENNE' => $validated['ID_CARTE_ANCIENNE'],
            'ID_CARTE_NOUVELLE' => $nouvelleCarte->id,
            'DATE_REMPLACEMENT' => $validated['DATE_REMPLACEMENT'],
            'OBSERVATIONS' => $validated['OBSERVATIONS']
        ]);
        
        // Load relationships and return
        $remplacement->load(['carteAncienne', 'carteNouvelle']);
        return response()->json($remplacement, 201);
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
}
