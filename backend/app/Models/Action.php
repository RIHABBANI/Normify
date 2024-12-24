<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    protected $table = 'actions';

    protected $fillable = [
        'conformity_id',
        'action_title',
        'action_description',
        'action_start_date',
        'action_end_date',
        'action_status',    
        'action_priority',
    ];
}
