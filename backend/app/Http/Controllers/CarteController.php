<?php

namespace App\Http\Controllers;

use App\Models\Carte;
use App\Models\Rak;
use App\Models\HistoriqueCarte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarteController extends Controller
{
    public function index()
    {
        $cartes = Carte::with('rak')->get();
        return response()->json($cartes);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_RAK' => 'required|exists:raks,id',
            'REFERENCE_CARTE' => 'required|string|max:225',
            'STATU_CARTE' => 'required|string|max:50'
        ]);

        try {
            DB::beginTransaction();
            
            // Create the carte
            $carte = Carte::create($validated);
            
            // Automatically create history entry marking the carte as "installee"
            HistoriqueCarte::create([
                'ID_CARTE' => $carte->id,
                'STATUS' => 'installee'
            ]);
            
            DB::commit();
            
            return response()->json($carte, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Failed to create carte: ' . $e->getMessage()], 500);
        }
    }

    public function show(Carte $carte)
    {
        return response()->json($carte->load('rak', 'pannes'));
    }

    public function showByRak(Rak $rak)
    {
        $cartes = Carte::where('ID_RAK', $rak->id)->get();
        return response()->json($cartes);
    }
    
    public function showByRame($rameId)
    {
        // Get all RAKs belonging to the specified RAME
        $raks = Rak::where('ID_RAME', $rameId)->pluck('id');
        
        // Get all cartes belonging to these RAKs
        $cartes = Carte::whereIn('ID_RAK', $raks)->with('rak')->get();
        
        return response()->json($cartes);
    }

    public function showHistory()
    {
        
    }

    public function update(Request $request, Carte $carte)
    {
        $validated = $request->validate([
            'ID_RAK' => 'sometimes|exists:raks,id',
            'REFERENCE_CARTE' => 'sometimes|string|max:225',
            'STATU_CARTE' => 'sometimes|string|max:50'
        ]);

        $carte->update($validated);
        return response()->json($carte);
    }

    public function destroy(Carte $carte)
    {
        $carte->delete();
        return response()->json(null, 204);
    }

    public function attachPanne(Request $request, Carte $carte)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'required|exists:pannes,ID_PANNE'
        ]);

        $carte->pannes()->attach($validated['ID_PANNE']);
        return response()->json($carte->load('pannes'));
    }

    public function detachPanne(Request $request, Carte $carte)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'required|exists:pannes,ID_PANNE'
        ]);

        $carte->pannes()->detach($validated['ID_PANNE']);
        return response()->json($carte->load('pannes'));
    }
}