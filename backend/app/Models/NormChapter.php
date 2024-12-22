<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NormChapter extends Model
{
    use HasFactory;

    protected $table = 'norm_chapters';

    protected $fillable = [
        'norm_id',
        'chapter_title',
    ];
}
