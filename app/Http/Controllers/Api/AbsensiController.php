<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absensi;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $this->authorize('viewAny', Absensi::class);
        
        if($user->role->name_role === "Manager") {
            $absensi = Absensi::with("user")->get();
        }elseif($user->role->name_role === "Koordinator") {
            $absensi = Absensi::with('user')->whereHas('user', fn($q) => $q->where('team_id', $user->team_id))->get();
        }else{
            $absensi = Absensi::where("user_id", $user->id)->get();
        }

        return response()->json([
            'message' => 'Data absensi berhasil didapatkan',
            'data' => $absensi
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Absensi::class);

        $data = $request->validate([
            'user_id' => 'required',
            'date' => 'required',
            'status' => 'required',
            'event_id' => 'required',
            'note' => 'nullable|string',
        ]);

        $absensi = Absensi::create($data);

        return response()->json([
            'message' => 'data absensi berhasil disimpan',
            'data' => $absensi
        ], 201);
    }

    public function update(Request $request, Absensi $absensi) {
        $this->authorize('update', $absensi);

        $data = $request->validate([
            'status' => 'required|in:hadir,izin,sakit,alpa',
            'note' => 'nullable|string',
        ]);

        $absensi->update($data);

        return response()->json([
            'message' => 'Data absensi berhasil diupdate',
            'data' => $absensi->load('user')
        ], 200);
    }

    public function show(Absensi $absensi)
    {
        $this->authorize('view', $absensi);

        return response()->json([
            'message' => 'Detail absensi',
            'data' => $absensi->load('user')
        ]);
    }
}
