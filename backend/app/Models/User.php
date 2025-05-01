<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    protected $primaryKey = 'ID_MAINTENANCE';
    protected $fillable = [
        'ID_PANNE',
        'ID_UTILISATEUR',
        'TYPE_MAINTENANCE',
        'DATE_MAINTENACE',
        'TYPE_OPERATION'
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
