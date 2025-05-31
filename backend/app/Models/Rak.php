<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rak extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'ID_RAME',
        'NOM_RAK',
        'MOTRICE'
    ];

    public function rame()
    {
        return $this->belongsTo(Rame::class, 'ID_RAME');
    }

    public function cartes()
    {
        return $this->hasMany(Carte::class, 'ID_RAK');
    }
}
