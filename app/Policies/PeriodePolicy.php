<?php

namespace App\Policies;

use App\Models\Periode;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PeriodePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Periode $periode): bool
    {
        //Role Manager
        if ($user->role->name_role === 'Manager') {
            return true;
        }   

        //Role Koordinator
        if ($user->role->name_role === 'Koordinator') {
            return $periode->team_id === $user->team_id;
        }

        //Role Karyawan
        return $user->id === $periode->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Periode $periode): bool
    {
        return $user->id === $periode->user_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Periode $periode): bool
    {
        return $user->id === $periode->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Periode $periode): bool
    {
        return $user->role->name_role === 'Manager';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Periode $periode): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Periode $periode): bool
    {
        return false;
    }
}
