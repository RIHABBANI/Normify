<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervention extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'DATE_INTERVENTION',
        'MOTIF',
        'TRAVAUX',
        'ID_PANNE',
        'ID_UTILISATEUR'
    ];

    public function panne()
    {
        return $this->belongsTo(Panne::class, 'ID_PANNE');
    }

    public function utilisateur()
    {
        return $this->belongsTo(User::class, 'ID_UTILISATEUR');
    }
}