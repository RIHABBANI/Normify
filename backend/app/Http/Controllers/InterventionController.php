<?php

namespace App\Http\Controllers;

use App\Models\Intervention;
use App\Models\Panne;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class InterventionController extends Controller
{
    public function index()
    {
        $interventions = Intervention::all();
        return response()->json($interventions);
        
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'DATE_INTERVENTION' => 'required|date',
            'MOTIF' => 'required|string|max:255',
            'TRAVAUX' => 'required|string'
        ]);

        $intervention = Intervention::create($validated);
        return response()->json($intervention, 201);
    }

    public function show(Intervention $intervention)
    {
        return response()->json($intervention);
    }

    public function update(Request $request, Intervention $intervention)
    {
        $validated = $request->validate([
            'DATE_INTERVENTION' => 'sometimes|date',
            'MOTIF' => 'sometimes|string|max:255',
            'TRAVAUX' => 'sometimes|string'
        ]);

        $intervention->update($validated);
        return response()->json($intervention);
    }

    public function destroy(Intervention $intervention)
    {
        $intervention->delete();
        return response()->json(null, 204);
    }
}