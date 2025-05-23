<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panne extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'DESCRIPTION_PANNE',
        'GRAVITE_PANNE'
    ];

    public function cartes()
    {
        return $this->belongsToMany(Carte::class, 'subirs', 'ID_PANNE', 'ID_CARTE');
    }

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'ID_PANNE');
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class, 'ID_PANNE');
    }
}