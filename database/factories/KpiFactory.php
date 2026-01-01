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
            $percentage >= 1 => 'achieved',
            $percentage >= 0.8 => 'warning',
            default => 'failed',
        };

        return [
            'periode_id' => \App\Models\Periode::factory(),
            'deskripsi' => fake()->sentence(10),
            'weight' => $weight,
            'target' => $target,
            'achievement' => $achievement,
            'score' => $score,
            'status' => $status,
        ];
    }

}
