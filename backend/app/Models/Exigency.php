<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exigency extends Model
{
    use HasFactory;

    protected $table = 'exigencies';

    protected $fillable = [
        'norm_sub_chapter_id',
        'exigency_title',
        'exigency_description',
    ];
}
