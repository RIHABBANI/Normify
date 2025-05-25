<?php

namespace App\Http\Controllers;

use App\Models\Carte;
use App\Models\Rak;
use Illuminate\Http\Request;

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

        $carte = Carte::create($validated);
        return response()->json($carte, 201);
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