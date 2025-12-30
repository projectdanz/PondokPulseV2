<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name_team' => fake()->randomElement([
                'Tim Pengembangan',
                'Tim Marketing',
                'Tim Operasional',
                'Tim Keuangan',
                'Tim HR',
                'Tim IT Support',
                'Tim Produksi',
                'Tim Quality Assurance',
                'Tim Customer Service',
                'Tim Research & Development'
            ]),
            'user_id' => User::factory(),
        ];
    }
}
