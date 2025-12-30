<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Absensi>
 */
class AbsensiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['hadir', 'izin', 'sakit', 'alpa']);
        
        // Add note for non-hadir statuses
        $note = $status !== 'hadir' ? fake()->optional(0.7)->sentence() : null;

        return [
            'user_id' => \App\Models\User::factory(),
            'date' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d'),
            'event_id' => \App\Models\Event::factory(),
            'status' => $status,
            'note' => $note,
        ];
    }
}
