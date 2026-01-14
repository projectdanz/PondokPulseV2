<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    /** @use HasFactory<\Database\Factories\ProgramFactory> */
    use HasFactory;

    protected $fillable = [
        'name_program',
    ];

    protected $casts = [
        'name_program' => 'string',
    ];

    public function profiles()
    {
        return $this->hasMany(UserProfile::class);
    }
}
