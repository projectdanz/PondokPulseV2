<?php

namespace App\Services;

use App\Models\UserProfile;
use Carbon\Carbon;

class UserProfileService
{
   public function handleExitService(UserProfile $userProfile): void
   {
      $currentYear = Carbon::now()->year;
      
      if ($userProfile->user && ! $userProfile->user->is_active) {
        $userProfile->exit_year = $currentYear;
        return;
      } 

      $programmes = $userProfile->program?->name_program;

      if (! $userProfile->join_year || ! $programmes) {
        return;
      }

      $program = strtolower($programmes);

      match($program){
        'pondok it', 'sekolah it' => $userProfile->exit_year = $userProfile->join_year + 3,
        'rumah it' => $userProfile->exit_year = $userProfile->join_year + 1,
        default => null,
      };
   }
}