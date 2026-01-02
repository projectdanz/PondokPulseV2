<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Periode;

class PeriodeController extends Controller
{
    public function index(){
        $user = auth()->user();

        if ($user->role->name_role === 'Manager') {
            $periode = Periode::all();
        } elseif ($user->role->name_role === 'Koordinator') {
            $periode = Periode::where('team_id', $user->team_id)->get();
        } else {
            $periode = Periode::where('user_id', $user->id)->get();
        }

        return response()->json([
            'message' => 'Periode berhasil diambil',
            'data' => $periode
        ], 200);
    }

    public function show($id){
        $periode = Periode::with('user', 'team')->findOrFail($id);

        $this->authorize('view', $periode);

        return response()->json([
            'message' => 'Periode berhasil diambil',
            'data' => $periode
        ], 200);
    }

    public function store(Request $request){
        $user = auth()->user();

        $request->validate([
            'periode' => 'required|string',
        ]);

        $periode = Periode::create([
            'periode' => $request->periode,
            'user_id' => $user->id,
            'team_id' => $user->team_id,
        ]);

        return response()->json([
            'message' => 'Periode berhasil dibuat',
            'data' => $periode
        ], 201);
    }

    public function update($id, Request $request){
        $periode = Periode::findOrFail($id);

        $this->authorize('update', $periode);

        $request->validate([
            'periode' => 'required|string',
        ]);

        $periode->update([
            'periode' => $request->periode,
        ]);

        return response()->json([
            'message' => 'Periode berhasil diupdate',
            'data' => $periode
        ], 200);
    }

    public function destroy($id){
        $periode = Periode::findOrFail($id);

        $this->authorize('delete', $periode);

        $periode->delete(); 

        return response()->json([
            'message' => 'Periode berhasil dihapus',
        ], 200);
    }
}
