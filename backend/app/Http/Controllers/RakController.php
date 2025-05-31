<?php

namespace App\Http\Controllers;

use App\Models\Rak;
use App\Models\Rame;
use Illuminate\Http\Request;

class RakController extends Controller
{
    public function index()
    {
        $raks = Rak::all();
        return response()->json($raks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ID_RAME' => 'required|exists:rames,id',
            'NOM_RAK' => 'required|string|max:50',
            'MOTRICE' => 'required|in:M,MH'
        ]);

        $rak = Rak::create($validated);
        return response()->json($rak, 201);
    }

    public function show(Rak $rak)
    {
        return response()->json($rak->load('rame'));
    }

    public function showByRame(Rame $rame)
    {
        $raks = Rak::where('ID_RAME', $rame->id)->get();
        return response()->json($raks);
    }

    public function update(Request $request, Rak $rak)
    {
        $validated = $request->validate([
            'ID_RAME' => 'sometimes|exists:rames,id',
            'NOM_RAK' => 'sometimes|string|max:50',
            'MOTRICE' => 'sometimes|in:M,MH'
        ]);

        $rak->update($validated);
        return response()->json($rak);
    }

    public function destroy(Rak $rak)
    {
        $rak->delete();
        return response()->json(null, 204);
    }
}
