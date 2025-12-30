<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kpi>
 */
class KpiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $target = fake()->numberBetween(50, 100);
        $achievement = fake()->numberBetween(0, 120);
        $weight = fake()->numberBetween(5, 20);
        
        // Calculate score based on achievement vs target
        $percentage = $target > 0 ? ($achievement / $target) * 100 : 0;
        $score = (int) ($percentage * $weight / 100);
        
        // Determine status based on achievement percentage
        $status = match(true) {
            $percentage >= 100 => 'achieved',
            $percentage >= 80 => 'warning',
            $percentage >= 50 => 'draft',
            default => 'failed',
        };

        return [
            'user_id' => \App\Models\User::factory(),
            'team_id' => \App\Models\Team::factory(),
            'periode' => fake()->dateTimeBetween('-6 months', 'now')->format('Y-m-d'),
            'deskripsi' => fake()->sentence(10),
            'weight' => $weight,
            'target' => $target,
            'achievement' => $achievement,
            'score' => $score,
            'status' => $status,
        ];
    }

}
