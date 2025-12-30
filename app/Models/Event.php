<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_event',
        'description_event',
    ];

    /**
     * Get the absensis for the event.
     */
    public function absensis(): HasMany
    {
        return $this->hasMany(Absensi::class);
    }
}
