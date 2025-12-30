<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventNames = [
            'Rapat Koordinasi Bulanan',
            'Training Karyawan Baru',
            'Workshop Pengembangan Skill',
            'Evaluasi Kinerja Tim',
            'Gathering Akhir Tahun',
            'Seminar Motivasi',
            'Pelatihan Kepemimpinan',
            'Rapat Evaluasi Proyek',
            'Team Building Activity',
            'Sosialisasi Kebijakan Baru',
            'Upacara Bendera',
            'Kajian Rutin Mingguan',
            'Kegiatan Sosial Masyarakat',
            'Bakti Sosial',
            'Peringatan Hari Besar',
        ];

        return [
            'name_event' => fake()->randomElement($eventNames),
            'description_event' => fake()->optional(0.8)->paragraph(),
        ];
    }
}
