<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kpi;
use App\Models\Periode;


class KpiController extends Controller
{
    public function index(){
        $user = auth()->user();

        $this->authorize('viewAny', Kpi::class);

        if($user->role->name_role === "Manager") {
            $kpis = Kpi::all();
        } elseif($user->role->name_role === "Koordinator") {
            $kpis = Kpi::whereHas('periode', fn($q) => $q->where('team_id', $user->team_id))->get();
        } else {
            $kpis = Kpi::whereHas('periode', fn($q) => $q->where('user_id', $user->id))->get();
        }

        return response()->json([
            'message' => 'KPI berhasil diambil',
            'user' => $user->role->name_role,
            'data' => $kpis
        ], 200);
    }

    public function show(Kpi $kpi){
        $kpi->load([
            'periode.user',
            'periode.team',
        ]);

        $this->authorize('view', $kpi);

        return response()->json([
            'message' => 'KPI berhasil diambil',
            'data' => $kpi
        ], 200);
    }

    public function store(Request $request, Periode $periode){
        $this->authorize('create', $periode);
        
        $request->validate([
            'deskripsi' => 'required|string',
            'weight' => 'required|integer|min:1|max:100',
            'target' => 'required|integer|min:1',
            'achievement' => 'nullable|integer|min:0',
        ]);

        $achievement = $request->achievement ?? 0;
        $target = $request->target;
        $weight = $request->weight;

        $percentage = ($achievement / $target) * 100;
        $score = min(($percentage / 100) * $weight, $weight);

        $status = $achievement === null ? 'failed' : (
            $percentage >= 100 ? 'achieved' 
            : ($percentage >= 80 ? 'warning' : 'failed'));

        $kpi = $periode->kpis()->create([
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

    public function update(Request $request, $kpi)
    {
        $kpi = Kpi::findOrFail($kpi);
        
        $this->authorize('update', $kpi);

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
            default => 'failed',
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

    public function destroy(Periode $periode, Kpi $kpi)
    {
        $this->authorize('delete', $kpi);

        if($kpi->periode_id !== $periode->id) {
            return response()->json([
                'message' => 'KPI tidak ditemukan',
            ], 404);
        }

        $kpi->delete();

        return response()->json([
            'message' => 'KPI berhasil dihapus',
            'data' => $kpi
        ], 200);
    }

}
