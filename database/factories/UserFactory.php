<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isActive = fake()->boolean(80); // 80% chance of being active
        $joinYear = fake()->numberBetween(2015, 2025);
        
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'is_active' => $isActive,
            'join_year' => $joinYear,
            'exit_year' => $isActive ? null : fake()->numberBetween($joinYear + 1, 2030),
            'role_id' => null, // Will be set after roles are seeded
            'team_id' => null, // Will be set after teams are seeded
            'jobDesk_id' => null, // Will be set after jobDesk are seeded
            'remember_token' => Str::random(10),
        ];
    }


    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
