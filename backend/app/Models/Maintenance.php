<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'DATE_MAINTENANCE',
        'SIGNALEMENT_MAINTENANCE',
        'ANOMALIE_MAINTENANCE',
        'ORGANE_MAINTENANCE',
    ];

}
