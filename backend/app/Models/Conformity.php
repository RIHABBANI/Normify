<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conformity extends Model
{
    use HasFactory;

    protected $table = 'conformities';

    protected $fillable = [
        'exigency_id',
        'conformity',
    ];
    
}
