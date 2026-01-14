<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['Laki-laki', 'Perempuan']);
        $isActive = fake()->boolean(80); // 80% chance of being active
        $joinYear = fake()->numberBetween(2015, 2025);
        
        return [
            'user_id' => \App\Models\User::factory(),
            'team_id' => null, // Will be set in seeder
            'program_id' => null, // Will be set in seeder
            'jobDesk_id' => null, // Will be set in seeder
            'birth_date' => fake()->dateTimeBetween('-50 years', '-18 years')->format('Y-m-d'),
            'phone_number' => '08' . fake()->numerify('##########'),
            'parent_phone_number' => fake()->optional(0.7)->numerify('08##########'),
            'gender' => $gender,
            'address' => fake()->address(),
            'profile_link' => fake()->imageUrl(400, 400, 'people', true, $gender === 'Laki-laki' ? 'men' : 'women'),
            'join_year' => $joinYear,
            'exit_year' => $isActive ? null : fake()->numberBetween($joinYear + 1, 2030),
        ];
    }
}
