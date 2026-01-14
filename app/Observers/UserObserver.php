<?php

namespace App\Observers;

use App\Models\User;
use Carbon\Carbon;

class UserObserver
{
    public function updated(User $user): void
    {
        if($user->isDirty('is_active') && $user->is_active === false){
            $user->profile?->update([
                'exit_year' => Carbon::now()->year,
            ]);
        }
    }
}
