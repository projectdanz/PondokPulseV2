<?php

namespace Database\Seeders;

use App\Models\JobDesk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobDeskSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jobDesks = [
            [
                'name_job' => 'Full Stack Developer',
                'description_job' => 'Bertanggung jawab mengembangkan aplikasi web dari sisi frontend dan backend, melakukan maintenance sistem, dan berkolaborasi dengan tim untuk mengimplementasikan fitur baru.'
            ],
            [
                'name_job' => 'Marketing Manager',
                'description_job' => 'Merencanakan dan melaksanakan strategi pemasaran, mengelola tim marketing, menganalisis tren pasar, dan meningkatkan brand awareness perusahaan.'
            ],
            [
                'name_job' => 'HR Specialist',
                'description_job' => 'Mengelola rekrutmen karyawan, mengurus administrasi kepegawaian, menangani employee relations, dan mengembangkan program pengembangan SDM.'
            ],
            [
                'name_job' => 'Finance Analyst',
                'description_job' => 'Menganalisis laporan keuangan, membuat proyeksi budget, melakukan audit internal, dan memberikan rekomendasi untuk efisiensi keuangan perusahaan.'
            ],
            [
                'name_job' => 'UI/UX Designer',
                'description_job' => 'Merancang interface aplikasi yang user-friendly, melakukan riset pengguna, membuat wireframe dan prototype, serta berkolaborasi dengan developer.'
            ],
            [
                'name_job' => 'Project Manager',
                'description_job' => 'Merencanakan dan mengkoordinasi proyek, mengelola timeline dan budget, memimpin tim project, dan memastikan deliverables sesuai target.'
            ],
            [
                'name_job' => 'Quality Assurance',
                'description_job' => 'Melakukan testing aplikasi, membuat test case, mengidentifikasi bug, dan memastikan kualitas produk sebelum dirilis ke production.'
            ],
            [
                'name_job' => 'Customer Service',
                'description_job' => 'Menangani pertanyaan dan keluhan pelanggan, memberikan solusi atas masalah yang dihadapi, dan menjaga kepuasan pelanggan.'
            ],
            [
                'name_job' => 'Data Analyst',
                'description_job' => 'Mengumpulkan dan menganalisis data, membuat visualisasi data, mengidentifikasi pattern dan insight, serta memberikan rekomendasi berbasis data.'
            ],
            [
                'name_job' => 'Content Writer',
                'description_job' => 'Membuat konten artikel, blog, dan media sosial, melakukan riset topik, mengoptimasi SEO, dan menjaga konsistensi brand voice.'
            ]
        ];

        foreach ($jobDesks as $jobDesk) {
            JobDesk::create($jobDesk);
        }
    }
}
