<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NormSubChapter extends Model
{
    use HasFactory;

    protected $table = 'norm_sub_chapters';

    protected $fillable = [
        'chapter_id',
        'sub_chapter_title',
    ];
}
