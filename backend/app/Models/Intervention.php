<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'ID_PANNE',
        'ID_UTILISATEUR',
        'DATE_INTERVENTION',
        'ACTION_EFFECTUEE_INTERVENTION',
        'DUREE_INTERVENTION'
    ];

    public function panne()
    {
        return $this->belongsTo(Panne::class, 'ID_PANNE');
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'ID_UTILISATEUR');
    }
}