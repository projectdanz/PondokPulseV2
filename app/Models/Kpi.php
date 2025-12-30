<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kpi extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'team_id',
        'periode',
        'deskripsi',
        'weight',
        'target',
        'achievement',
        'score',
        'status',
    ];

    protected $casts = [
        'periode' => 'date',
        'weight' => 'integer',
        'target' => 'integer',
        'achievement' => 'integer',
        'score' => 'integer',
    ];

    /**
     * Get the user that owns the KPI.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the team that owns the KPI.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
