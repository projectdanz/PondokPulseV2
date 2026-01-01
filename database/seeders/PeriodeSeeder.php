<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Periode;
use Carbon\Carbon;

class PeriodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $startYear = 2026;
        $months = range(1, 12);

        foreach ($users as $user) {
            foreach ($months as $month) {
                // Format period like "2026-01"
                $periodeString = sprintf('%d-%02d', $startYear, $month);
                
                // Check if user has a team, if not skip or handle accordingly (schema says nullable)
                // We'll use the user's current team_id
                
                Periode::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'periode' => $periodeString,
                    ],
                    [
                        'team_id' => $user->team_id,
                    ]
                );
            }
        }
    }
}
