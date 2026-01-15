<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
{
    $authUser = auth()->user();

    if ($authUser->role->name_role === 'Manager') {
        $users = User::all();
    } elseif ($authUser->role->name_role === 'Koordinator') {
        $users = User::where('team_id', $authUser->team_id)->get();
    } else {
        $users = User::where('id', $authUser->id)->get();
    }

    return response()->json([
        'message' => 'User berhasil didapatkan',
        'data' => $users
    ]);
}


    public function show($id)
    {
        $user = User::findOrFail($id);

        $this->authorize('view', $user);

        return response()->json([
            'message' => 'User berhasil didapatkan',
            'data' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $this->authorize('update', $user);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'role_id' => 'sometimes|exists:roles,id',
            'is_active' => 'sometimes|boolean',
        ]);

        $user->update(
            $request->only([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role_id' => $request->role_id,
            'is_active' => $request->is_active,
            ])
        );

        return response()->json([
            'message' => 'User berhasil diupdate',
            'data' => $user
        ]);
    }
}

