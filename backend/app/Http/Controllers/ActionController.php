<?php

namespace App\Http\Controllers;

use App\Models\Action;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    public function show(){
        $actions = Action::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Actions List',
            'data' => $actions
        ]);
    }

    public function showById($id){
        $action = Action::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This action retrieved successfully',
            'data' => $action
        ]);

    }    
}
