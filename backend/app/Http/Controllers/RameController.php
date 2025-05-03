<?php

namespace App\Http\Controllers;

use App\Models\Rame;
use Illuminate\Http\Request;

class RameController extends Controller
{
    public function index()
    {
        $rames = Rame::all();
        return response()->json($rames);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'NUMERO_RAME' => 'required|string|max:20',
            'TYPE_RAME' => 'required|string|max:20',
            'DATE_MISE_EN_SERVICR_RAME' => 'required|date'
        ]);

        $rame = Rame::create($validated);
        return response()->json($rame, 201);
    }

    public function show(Rame $rame)
    {
        return response()->json($rame);
    }

    public function update(Request $request, Rame $rame)
    {
        $validated = $request->validate([
            'NUMERO_RAME' => 'sometimes|string|max:20',
            'TYPE_RAME' => 'sometimes|string|max:20',
            'DATE_MISE_EN_SERVICR_RAME' => 'sometimes|date'
        ]);

        $rame->update($validated);
        return response()->json($rame);
    }

    public function destroy(Rame $rame)
    {
        $rame->delete();
        return response()->json(null, 204);
    }
}
