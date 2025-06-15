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
        $maintenances = Maintenance::all();
        return response()->json($maintenances);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'DATE_MAINTENANCE' => 'required|date',
            'SIGNALEMENT_MAINTENANCE' => 'required|strin',
            'ANOMALIE_MAINTENANCE' => 'required|string',
            'ORGANE_MAINTENANCE' => 'required|string',
        ]);

        $maintenance = Maintenance::create($validated);
        return response()->json($maintenance, 201);
    }

    public function show(Maintenance $maintenance)
    {
        return response()->json($maintenance, 200);
    }

    public function update(Request $request, Maintenance $maintenance)
    {
        $validated = $request->validate([
            'DATE_MAINTENANCE' => 'sometimes|date',
            'SIGNALEMENT_MAINTENANCE' => 'sometimes|string|max:1024',
            'ANOMALIE_MAINTENANCE' => 'sometimes|string|max:1024',
            'ORGANE_MAINTENANCE' => 'sometimes|string|max:1024',
        ]);

        $maintenance->update($validated);
        return response()->json($maintenance, 200);
    }

    public function destroy(Maintenance $maintenance)
    {
        $maintenance->delete();
        return response()->json(null, 204);
    }
}