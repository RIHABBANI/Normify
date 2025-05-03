<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Panne;
use App\Models\Utilisateur;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    public function index()
    {
        $maintenances = Maintenance::with(['panne', 'utilisateur'])->get();
        return response()->json($maintenances);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'required|exists:pannes,ID_PANNE',
            'ID_UTILISATEUR' => 'required|exists:utilisateurs,ID_UTILISATEUR',
            'TYPE_MAINTENANCE' => 'required|string|max:50',
            'DATE_MAINTENACE' => 'required|date',
            'TYPE_OPERATION' => 'required|string|max:225'
        ]);

        $maintenance = Maintenance::create($validated);
        return response()->json($maintenance, 201);
    }

    public function show(Maintenance $maintenance)
    {
        return response()->json($maintenance->load(['panne', 'utilisateur']));
    }

    public function update(Request $request, Maintenance $maintenance)
    {
        $validated = $request->validate([
            'ID_PANNE' => 'sometimes|exists:pannes,ID_PANNE',
            'ID_UTILISATEUR' => 'sometimes|exists:utilisateurs,ID_UTILISATEUR',
            'TYPE_MAINTENANCE' => 'sometimes|string|max:50',
            'DATE_MAINTENACE' => 'sometimes|date',
            'TYPE_OPERATION' => 'sometimes|string|max:225'
        ]);

        $maintenance->update($validated);
        return response()->json($maintenance);
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return response()->json(null, 204);
    }
}