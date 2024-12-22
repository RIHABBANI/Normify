<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Norm extends Model
{
    use HasFactory;

    protected $table = 'norms';

    protected $fillable = [
        'norm_ref',
        'norm_abbreviation_name',
        'norm_complet_name',
        'norm_version',
        'norm_pub_date',
    ];
}
