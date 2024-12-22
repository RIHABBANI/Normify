<?php

namespace App\Http\Controllers;

use App\Models\NormSubChapter;
use Illuminate\Http\Request;

class NormSubChapterController extends Controller
{
    public function show(){
        $norm_sub_chapters = NormSubChapter::all();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Norm Sub Chapters List',
            'data' => $norm_sub_chapters
        ]);
    }

    public function showById($id){
        $norm_sub_chapter = NormSubChapter::find($id);

        return response()->json([
            'success' => true,
            'flaq' => 200,
            'message' => 'This norm sub chapter retrieved successfully',
            'data' => $norm_sub_chapter
        ]);

    }

}
