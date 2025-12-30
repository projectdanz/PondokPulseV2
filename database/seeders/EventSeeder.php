<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'name_event' => 'Rapat Koordinasi Bulanan',
                'description_event' => 'Rapat koordinasi rutin untuk membahas progress dan kendala tim',
            ],
            [
                'name_event' => 'Training Karyawan Baru',
                'description_event' => 'Pelatihan orientasi untuk karyawan yang baru bergabung',
            ],
            [
                'name_event' => 'Workshop Pengembangan Skill',
                'description_event' => 'Workshop untuk meningkatkan kemampuan teknis dan soft skill karyawan',
            ],
            [
                'name_event' => 'Evaluasi Kinerja Tim',
                'description_event' => 'Sesi evaluasi kinerja tim secara berkala',
            ],
            [
                'name_event' => 'Kajian Rutin Mingguan',
                'description_event' => 'Kajian keagamaan rutin setiap minggu untuk santri',
            ],
            [
                'name_event' => 'Upacara Bendera',
                'description_event' => 'Upacara bendera setiap hari Senin',
            ],
            [
                'name_event' => 'Bakti Sosial',
                'description_event' => 'Kegiatan bakti sosial ke masyarakat sekitar',
            ],
            [
                'name_event' => 'Peringatan Hari Besar Islam',
                'description_event' => 'Peringatan hari besar Islam seperti Maulid Nabi, Isra Mi\'raj, dll',
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }

        // Create additional random events
        Event::factory(7)->create();
    }
}
