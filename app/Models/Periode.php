<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periode extends Model
{
    /** @use HasFactory<\Database\Factories\PeriodeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'team_id',
        'periode',
    ];

    /**
     * Get the user that owns the periode.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the team that owns the periode.
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the kpi for the periode.
     */
    public function kpis()
    {
        return $this->hasMany(Kpi::class);
    }
}
