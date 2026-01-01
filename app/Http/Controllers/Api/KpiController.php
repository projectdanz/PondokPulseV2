<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kpi;

class KpiController extends Controller
{
    public function index(){
        $user = auth()->user();

        //Manager -> semua kpi
        if ($user->role->name_role === 'Manager'){
            return kpi::with(['user', 'team'])->get();
        }

        //Koordinator -> kpi anggota team
        if ($user->team && $user->id === $user->team->user_id){
           return kpi::where('team_id', $user->team_id)->with(['user', 'team'])->get();
        }

        //User -> kpi sendiri
        return kpi::where('user_id', $user->id)->with(['user', 'team'])->get();
    }

    public function show($id){
        $kpi = kpi::with(['user', 'team'])->findOrFail($id);

        $this->authorize('view', $kpi);

        return response()->json([
            'message' => 'KPI berhasil diambil',
            'data' => $kpi
        ], 200);
    }

    public function store(Request $request){
        $request->validate([
            'deskripsi' => 'required|string',
            'weight' => 'required|integer|min:1|max:100',
            'target' => 'required|integer|min:1',
            'periode_id' => 'required|integer',
            'achievement' => 'nullable|integer|min:0',
        ]);

        $user = auth()->user();

        $periode = $request->periode_id;
        $achievement = $request->achievement;
        $target = $request->target;
        $weight = $request->weight;

        $percentage = $achievement / $target;
        $score = $percentage * $weight;

        if ($percentage < 0.8){
            $status = 'failed';
        }elseif ($percentage < 1){
            $status = 'warning';
        }else{
            $status = 'achieved';
        }

        $kpi = Kpi::create([
            'periode_id' => $periode,
            'deskripsi' => $request->deskripsi,
            'weight' => $weight,
            'target' => $target,
            'achievement' => $achievement,
            'score' => round($score),
            'status' => $status,
        ]);

        return response()->json([
            'message' => 'KPI berhasil dibuat',
            'data' => $kpi
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $kpi = Kpi::findOrFail($id);

        $request->validate([
            'achievement' => 'nullable|integer|min:0',
            'deskripsi' => 'nullable|string',
            'weight' => 'nullable|integer|min:1|max:100',
            'target' => 'nullable|integer|min:1'
        ]);

        $target = max(1, $kpi->target ?? $request->target);
        $achievement = max(0, $kpi->achievement ?? $request->achievement);
        $weight = min(100, max(0, $kpi->weight ?? $request->weight));

        $achievementCapped = min($achievement, $target);

        $percentage = ($achievementCapped / $target) * 100;

        $score = ($percentage / 100) * $weight;
        $score = min($score, $weight);

        $status = match (true) {
            $percentage >= 100 => 'achieved',
            $percentage >= 80  => 'warning',    
            $percentage >= 50  => 'draft',
           default            => 'failed',
        };

        $data = [
            'deskripsi' => $request->deskripsi ?? $kpi->deskripsi,
            'weight' => $request->weight ?? $kpi->weight,
            'target' => $request->target ?? $kpi->target,
            'achievement' => $request->achievement ?? $kpi->achievement,
        ];

        $kpi->update([
            ...$data,
            'score' => round($score),
            'status' => $status
        ]);

        return response()->json([
            'message' => 'Achievement updated',
            'data' => $kpi
        ]);
}

}
