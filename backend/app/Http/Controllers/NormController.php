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
        $interventions = Intervention::with(['panne', 'utilisateur'])->get();
        return response()->json($interventions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'required|exists:pannes,ID_PANNE',
            'ID_UTILISATEUR' => 'required|exists:utilisateurs,ID_UTILISATEUR',
            'DATE_INTERVENTION' => 'required|date',
            'ACTION_EFFECTUEE_INTERVENTION' => 'required|string|max:225',
            'DUREE_INTERVENTION' => 'required|integer'
        ]);

        $intervention = Intervention::create($validated);
        return response()->json($intervention, 201);
    }

    public function show(Intervention $intervention)
    {
        return response()->json($intervention->load(['panne', 'utilisateur']));
    }

    public function update(Request $request, Intervention $intervention)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'sometimes|exists:pannes,ID_PANNE',
            'ID_UTILISATEUR' => 'sometimes|exists:utilisateurs,ID_UTILISATEUR',
            'DATE_INTERVENTION' => 'sometimes|date',
            'ACTION_EFFECTUEE_INTERVENTION' => 'sometimes|string|max:225',
            'DUREE_INTERVENTION' => 'sometimes|integer'
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