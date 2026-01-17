<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'team_id',
        'jobDesk_id',
        'program_id',
        'birth_date',
        'phone_number',
        'parent_phone_number',
        'gender',
        'address',
        'profile_link',
        'join_year',
        'exit_year',
    ];

    protected function casts(): array
    {
        return [
            'join_year' => 'integer',
            'exit_year' => 'integer',
        ];
    }

    // protected $casts = [
    //     'birth_date' => 'date',
    // ];

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withoutGlobalScopes();
    }

    /**
     * Get the team that owns the user.
     */
    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * Get the job desk that owns the user.
     */
    public function jobDesk()
    {
        return $this->belongsTo(JobDesk::class, 'jobDesk_id', 'id');
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }
}
