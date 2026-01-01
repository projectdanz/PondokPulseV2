<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Team::class);

        $team = Team::with(['coordinator', 'users'])->get();
        return response()->json([
            'message' => 'Team berhasil diambil',
            'data' => $team
        ], 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Team::class);

        $request->validate([
            'name_team' => 'required|string|max:255',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $team = Team::create($request->only('name_team', 'user_id'));
        return response()->json([
            'message' => 'Team berhasil dibuat',
            'data' => $team
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $team = Team::findOrFail($id);

        $this->authorize('update', $team);

        $request->validate([
            'name_team' => 'nullable|string|max:255',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $team->update($request->only('name_team', 'user_id'));

        return response()->json([
            'message' => 'Team updated successfully',
            'data' => $team
        ], 200);
    }

    public function show($id)
    {
        $team = Team::with(['coordinator', 'users'])->findOrFail($id);

        $this->authorize('view', $team);

        return response()->json([
            'message' => 'Detail team',
            'data' => $team
        ], 200);
    }

    public function destroy($id)
    {
        $team = Team::findOrFail($id);

        $this->authorize('delete', $team);

        $team->delete();

        return response()->json([
            'message' => 'Team deleted successfully',
        ], 200);
    }

    public function assignMember(Request $request){
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'user_id' => 'required|exists:users,id',
        ]);

        User::where('id', $request->user_id)->update([
            'team_id' => $request->team_id,
        ]);

        return response()->json([
            'message' => 'User assigned to team successfully',
        ]);
    }

    public function unassignMember(Request $request){
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        User::where('id', $request->user_id)->update([
            'team_id' => null,
        ]);

        return response()->json([
            'message' => 'User unassigned from team successfully',
        ]);
    }
}
