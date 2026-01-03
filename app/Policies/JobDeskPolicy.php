<?php

namespace App\Policies;

use App\Models\JobDesk;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobDeskPolicy
{

    public function before(User $user, $ability)
    {
        if ($user->role->name_role === "Manager") {
            return true;
        }
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->role->name_role, ['Koordinator', 'Karyawan']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobDesk $jobDesk): bool
    {
        return in_array($user->role->name_role, ['Koordinator', 'Karyawan']);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobDesk $jobDesk): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobDesk $jobDesk): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobDesk $jobDesk): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobDesk $jobDesk): bool
    {
        return false;
    }
}
