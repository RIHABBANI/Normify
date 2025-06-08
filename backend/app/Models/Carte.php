<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carte extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'ID_RAK',
        'REFERENCE_CARTE',
        'STATU_CARTE'
    ];

    public function rak()
    {
        return $this->belongsTo(Rak::class, 'ID_RAK');
    }

    public function pannes()
    {
        return $this->belongsToMany(Panne::class, 'subirs', 'ID_CARTE', 'ID_PANNE');
    }

    public function historiqueCartes()
    {
        return $this->hasMany(HistoriqueCarte::class, 'ID_CARTE');
    }

    public function remplacementsAncienne()
    {
        return $this->hasMany(RemplacementCarte::class, 'ID_CARTE_ANCIENNE');
    }

    public function remplacementsNouvelle()
    {
        return $this->hasMany(RemplacementCarte::class, 'ID_CARTE_NOUVELLE');
    }
}
