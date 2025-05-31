<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriqueCarte extends Model
{
    use HasFactory;

    protected $table = 'historique_cartes';

    protected $fillable = [
        'ID_CARTE',
        'STATUS',
    ];

    public function carte()
    {
        return $this->belongsTo(Carte::class, 'ID_CARTE');
    }
}
