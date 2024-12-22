<?php

namespace App\Http\Controllers;

use App\Models\NormChapter;
use Illuminate\Http\Request;

class NormChapterController extends Controller
{
    public function show(){
        $norm_chapters = NormChapter::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Norm Chapters List',
            'data' => $norm_chapters
        ]);
    }

    public function showById($id){
        $norm_chapter = NormChapter::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This norm chapter retrieved successfully',
            'data' => $norm_chapter
        ]);

    }

}
