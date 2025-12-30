<?php

namespace Database\Factories;

use App\Models\JobDesk;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JobDesk>
 */
class JobDeskFactory extends Factory
{
    protected $model = JobDesk::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jobs = [
            [
                'name' => 'Full Stack Developer',
                'description' => 'Bertanggung jawab mengembangkan aplikasi web dari sisi frontend dan backend, melakukan maintenance sistem, dan berkolaborasi dengan tim untuk mengimplementasikan fitur baru.'
            ],
            [
                'name' => 'Marketing Manager',
                'description' => 'Merencanakan dan melaksanakan strategi pemasaran, mengelola tim marketing, menganalisis tren pasar, dan meningkatkan brand awareness perusahaan.'
            ],
            [
                'name' => 'HR Specialist',
                'description' => 'Mengelola rekrutmen karyawan, mengurus administrasi kepegawaian, menangani employee relations, dan mengembangkan program pengembangan SDM.'
            ],
            [
                'name' => 'Finance Analyst',
                'description' => 'Menganalisis laporan keuangan, membuat proyeksi budget, melakukan audit internal, dan memberikan rekomendasi untuk efisiensi keuangan perusahaan.'
            ],
            [
                'name' => 'UI/UX Designer',
                'description' => 'Merancang interface aplikasi yang user-friendly, melakukan riset pengguna, membuat wireframe dan prototype, serta berkolaborasi dengan developer.'
            ],
            [
                'name' => 'Project Manager',
                'description' => 'Merencanakan dan mengkoordinasi proyek, mengelola timeline dan budget, memimpin tim project, dan memastikan deliverables sesuai target.'
            ],
            [
                'name' => 'Quality Assurance',
                'description' => 'Melakukan testing aplikasi, membuat test case, mengidentifikasi bug, dan memastikan kualitas produk sebelum dirilis ke production.'
            ],
            [
                'name' => 'Customer Service',
                'description' => 'Menangani pertanyaan dan keluhan pelanggan, memberikan solusi atas masalah yang dihadapi, dan menjaga kepuasan pelanggan.'
            ],
            [
                'name' => 'Data Analyst',
                'description' => 'Mengumpulkan dan menganalisis data, membuat visualisasi data, mengidentifikasi pattern dan insight, serta memberikan rekomendasi berbasis data.'
            ],
            [
                'name' => 'Content Writer',
                'description' => 'Membuat konten artikel, blog, dan media sosial, melakukan riset topik, mengoptimasi SEO, dan menjaga konsistensi brand voice.'
            ]
        ];

        $job = fake()->randomElement($jobs);

        return [
            'name_job' => $job['name'],
            'description_job' => $job['description'],
        ];
    }
}
