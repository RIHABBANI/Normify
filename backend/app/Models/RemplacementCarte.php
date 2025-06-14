<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemplacementCarte extends Model
{
    use HasFactory;

    protected $table = 'remplacement_cartes';

    protected $fillable = [
        'ID_CARTE_ANCIENNE',
        'ID_CARTE_NOUVELLE',
        'DATE_REMPLACEMENT',
        'OBSERVATIONS',
        'CAUSE_REMPLACEMENT'
    ];

    public function carteAncienne()
    {
        return $this->belongsTo(Carte::class, 'ID_CARTE_ANCIENNE');
    }

    public function carteNouvelle()
    {
        return $this->belongsTo(Carte::class, 'ID_CARTE_NOUVELLE');
    }
}
