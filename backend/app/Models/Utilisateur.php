<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utilisateur extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID_UTILISATEUR';
    protected $fillable = [
        'NOM_UTILISATEUR',
        'MOT_DE_PASSE_UTILISATEUR',
        'ROLE_UTILISATEUR'
    ];

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'ID_UTILISATEUR');
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class, 'ID_UTILISATEUR');
    }
}
