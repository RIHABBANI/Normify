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

    public function showByChapterAndSubChapter(){
        $exigencies = Exigency::join('norm_sub_chapters', 'exigencies.norm_sub_chapter_id', '=', 'norm_sub_chapters.id')
            ->join('norm_chapters', 'norm_sub_chapters.norm_chapter_id', '=', 'norm_chapters.id')
            ->select(
                'exigencies.id',
                'exigencies.exigency_title', 
                'exigencies.exigency_description',
                'norm_sub_chapters.sub_chapter_title',
                'norm_chapters.chapter_title'
            )
            ->orderBy('exigencies.id', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'flag' => 200,
            'message' => 'Exigencies List',
            'data' => $exigencies
        ]);
    }

}
