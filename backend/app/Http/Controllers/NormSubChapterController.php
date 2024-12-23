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

    public function showByChapter(){
        $norm_sub_chapters = NormSubChapter::join('norm_chapters', 'norm_sub_chapters.norm_chapter_id', '=', 'norm_chapters.id')
            ->select(
                'norm_sub_chapters.id',
                'norm_sub_chapters.sub_chapter_title', 
                'norm_chapters.chapter_title')
            ->get();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Norm Sub Chapters List',
            'data' => $norm_sub_chapters
        ]);
    }

}
