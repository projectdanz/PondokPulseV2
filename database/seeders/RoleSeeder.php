<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['name_role' => 'Manager'],
            ['name_role' => 'Koordinator'],
            ['name_role' => 'Karyawan'],
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
