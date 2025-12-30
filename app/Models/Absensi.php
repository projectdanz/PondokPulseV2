<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Absensi extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'event_id',
        'status',
        'note',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Get the user that owns the absensi.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the event that owns the absensi.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }
}
