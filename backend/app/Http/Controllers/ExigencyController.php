<?php

namespace App\Http\Controllers;

use App\Models\Panne;
use Illuminate\Http\Request;

class PanneController extends Controller
{
    public function index()
    {
        $pannes = Panne::all();
        return response()->json($pannes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'DESCRIPTION_PANNE' => 'required|string|max:225',
            'GRAVITE_PANNE' => 'required|string|max:225'
        ]);

        $panne = Panne::create($validated);
        return response()->json($panne, 201);
    }

    public function show(Panne $panne)
    {
        return response()->json($panne->load('cartes', 'interventions', 'maintenances'));
    }

    public function update(Request $request, Panne $panne)
    {
        $validated = $request->validate([
            'DESCRIPTION_PANNE' => 'sometimes|string|max:225',
            'GRAVITE_PANNE' => 'sometimes|string|max:225'
        ]);

        $panne->update($validated);
        return response()->json($panne);
    }

    public function destroy(Panne $panne)
    {
        $panne->delete();
        return response()->json(null, 204);
    }
}
