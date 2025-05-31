<?php

namespace App\Http\Controllers;

use App\Models\HistoriqueCarte;
use Illuminate\Http\Request;

class HistoriqueCarteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $historiqueCartes = HistoriqueCarte::all();
        return response()->json($historiqueCartes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_CARTE' => 'required|exists:cartes,id',
            'STATUS' => 'required|string|max:50',
        ]);

        $historiqueCarte = HistoriqueCarte::create($validated);
        return response()->json($historiqueCarte, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(HistoriqueCarte $historiqueCarte)
    {
        return response()->json($historiqueCarte);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HistoriqueCarte $historiqueCarte)
    {
        // This method is not typically used in API controllers, but can be implemented if needed
        return response()->json($historiqueCarte);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HistoriqueCarte $historiqueCarte)
    {
        $validated = $request->validate([
            'ID_CARTE' => 'sometimes|exists:cartes,id',
            'STATUS' => 'sometimes|string|max:50',
        ]);

        $historiqueCarte->update($validated);
        return response()->json($historiqueCarte);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HistoriqueCarte $historiqueCarte)
    {
        $historiqueCarte->delete();
        return response()->json(null, 204);
    }

    /**
     * Get history for a specific carte with rak/rame/motrice info
     */
    public function getCarteHistory($carteId)
    {
        $historique = HistoriqueCarte::where('ID_CARTE', $carteId)
            ->with(['carte.rak.rame'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($historique);
    }
}

