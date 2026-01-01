<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kpi extends Model
{
    use HasFactory;

    protected $fillable = [
        'periode_id',
        'deskripsi',
        'weight',
        'target',
        'achievement',
        'score',
        'status',
    ];

    protected $casts = [
        'weight' => 'integer',
        'target' => 'integer',
        'achievement' => 'integer',
        'score' => 'integer',
    ];

    /**
     * Get the periode that owns the KPI.
     */
    public function periode(): BelongsTo
    {
        return $this->belongsTo(Periode::class);
    }
}
