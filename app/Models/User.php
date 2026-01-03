<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
        'team_id',
        'jobDesk_id',
        'is_active',
        'join_year',
        'exit_year',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'join_year' => 'integer',
            'exit_year' => 'integer',
        ];
    }

    /**
     * Get the role that owns the user.
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
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
        return $this->belongsTo(JobDesk::class);
    }

    /**
     * Get the profile associated with the user.
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    /**
     * Get the KPIs for the user.
     */
    public function kpis()
    {
        return $this->hasMany(Kpi::class);
    }

    /**
     * Get the absensis for the user.
     */
    public function absensis()
    {
        return $this->hasMany(Absensi::class);
    }

    /**
     * Get the teams coordinated by the user.
     */
    public function coordinatedTeams()
    {
        return $this->hasMany(Team::class);
    }
}
