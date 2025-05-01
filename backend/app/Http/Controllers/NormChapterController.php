<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UtilisateurController extends Controller
{
    public function index()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'NOM_UTILISATEUR' => 'required|string|max:50',
            'MOT_DE_PASSE_UTILISATEUR' => 'required|string|max:225',
            'ROLE_UTILISATEUR' => 'required|string|max:225'
        ]);

        $validated['MOT_DE_PASSE_UTILISATEUR'] = Hash::make($validated['MOT_DE_PASSE_UTILISATEUR']);
        
        $utilisateur = Utilisateur::create($validated);
        return response()->json($utilisateur, 201);
    }

    public function show(Utilisateur $utilisateur)
    {
        return response()->json($utilisateur->load('interventions', 'maintenances'));
    }

    public function update(Request $request, Utilisateur $utilisateur)
    {
        $validated = $request->validate([
            'NOM_UTILISATEUR' => 'sometimes|string|max:50',
            'MOT_DE_PASSE_UTILISATEUR' => 'sometimes|string|max:225',
            'ROLE_UTILISATEUR' => 'sometimes|string|max:225'
        ]);

        if (isset($validated['MOT_DE_PASSE_UTILISATEUR'])) {
            $validated['MOT_DE_PASSE_UTILISATEUR'] = Hash::make($validated['MOT_DE_PASSE_UTILISATEUR']);
        }

        $utilisateur->update($validated);
        return response()->json($utilisateur);
    }

    public function destroy(Utilisateur $utilisateur)
    {
        $utilisateur->delete();
        return response()->json(null, 204);
    }
}
