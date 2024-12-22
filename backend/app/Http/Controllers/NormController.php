<?php

namespace App\Http\Controllers;

use App\Models\Norm;
use Illuminate\Http\Request;

class NormController extends Controller
{
    public function show(){
        $norms = Norm::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Norms List',
            'data' => $norms
        ]);
    }

    public function showById($id){
        $norm = Norm::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This norm retrieved successfully',
            'data' => $norm
        ]);

    }
}
