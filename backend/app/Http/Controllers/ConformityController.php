<?php

namespace App\Http\Controllers;

use App\Models\Conformity;
use Illuminate\Http\Request;

class ConformityController extends Controller
{
    public function show(){
        $conformities = Conformity::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Conformities List',
            'data' => $conformities
        ]);
    }

    public function showById($id){
        $conformity = Conformity::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This conformity retrieved successfully',
            'data' => $conformity
        ]);

    }    
}
