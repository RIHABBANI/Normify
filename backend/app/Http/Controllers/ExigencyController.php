<?php

namespace App\Http\Controllers;

use App\Models\Exigency;
use Illuminate\Http\Request;

class ExigencyController extends Controller
{
    public function show(){
        $exigencies = Exigency::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Exigencies List',
            'data' => $exigencies
        ]);
    }

    public function showById($id){
        $exigency = Exigency::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This exigency retrieved successfully',
            'data' => $exigency
        ]);

    }    

}
