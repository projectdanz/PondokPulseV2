<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobDesk extends Model
{
    use HasFactory;
    protected $table = 'jobDesks';
    protected $fillable = [
        'name_job',
        'description_job',
    ];

    /**
     * Get the users for the job desk.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
