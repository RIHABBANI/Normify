<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rame extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'NUMERO_RAME',
        'TYPE_RAME',
        'DATE_MISE_EN_SERVICR_RAME'
    ];

    public function raks()
    {
        return $this->hasMany(Rak::class, 'ID_RAME');
    }
}