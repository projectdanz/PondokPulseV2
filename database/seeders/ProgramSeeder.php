<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Program;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programs = [
            ['name_program' => 'Pondok It'],
            ['name_program' => 'Rumah It'],
            ['name_program' => 'Sekolah It'],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }
    }
}
