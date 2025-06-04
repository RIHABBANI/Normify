<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'PRENOM_UTILISATEUR',
        'NOM_UTILISATEUR',
       // 'matricule',
        'NUMERO_TELEPHONE',
        'email',
        'password',
        'ROLE_UTILISATEUR',
    ];

    public function interventions()
    {
        return $this->hasMany(Intervention::class, 'id');
    }

    public function maintenances()
    {
        return $this->hasMany(Maintenance::class, 'id');
    }
}
