<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Step 1: Seed independent tables first
        $this->call([
            RoleSeeder::class,
            JobDeskSeeder::class,
        ]);
        
        // Step 2: Create users without foreign keys
        $users = \App\Models\User::factory(50)->create();
        
        // Step 3: Seed events (independent)
        $this->call([
            EventSeeder::class,
        ]);
        
        // Step 4: Seed teams (needs users as coordinators)
        $this->call([
            TeamSeeder::class,
        ]);
        
        // Step 5: Update users with foreign keys
        $roles = \App\Models\Role::all();
        $teams = \App\Models\Team::all();
        $jobDesks = \App\Models\JobDesk::all();
        
        foreach ($users as $user) {
            $user->update([
                'role_id' => $roles->random()->id,
                'team_id' => $teams->random()->id,
                'job_desk_id' => $jobDesks->random()->id,
            ]);
        }
        
        // Step 6: Create user profiles for all users
        foreach ($users as $user) {
            \App\Models\UserProfile::factory()->create([
                'user_id' => $user->id,
            ]);
        }
        
        // Step 7: Create absensis (needs users and events)
        $events = \App\Models\Event::all();
        foreach ($users->random(30) as $user) {
            \App\Models\Absensi::factory(5)->create([
                'user_id' => $user->id,
                'event_id' => $events->random()->id,
            ]);
        }
        
        // Step 8: Create KPIs (needs users and teams)
        foreach ($users->random(40) as $user) {
            \App\Models\Kpi::factory(3)->create([
                'user_id' => $user->id,
                'team_id' => $user->team_id,
            ]);
        }
    }

}
