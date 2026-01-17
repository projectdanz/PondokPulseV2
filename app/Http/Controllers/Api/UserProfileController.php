<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserProfile;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Requests\CreateUserProfileRequest;
use App\Services\UserProfileService;
use Illuminate\Support\Arr;

class UserProfileController extends Controller
{
    public function index() {
        $user = auth()->user();
        
        $query = UserProfile::with(['user', 'team', 'jobDesk', 'program']);
        if($user->role->name_role === 'Manager'){
            return $query->get();
        }

        if ($user->team_id->name_role === 'Koordinator') {
            $query->where('team_id', $user->team_id);
        }

        if ($user->role->name_role === 'Karyawan') {
            $query->where('user_id', $user->id);
        }

        return response()->json([
            'message' => 'User profile berhasil didapatkan',
            'data' => $query->get()
        ]);
    }

    public function update(
        UpdateUserProfileRequest $request,
        $id,
        UserProfileService $service
    ) {
        $userProfile = UserProfile::where('id', $id)->orWhere('user_id', $id)->firstOrFail();
        
        $this->authorize('update', $userProfile);

        $user = auth()->user();

        if (! $userProfile->user_id) {
            abort(409, 'User profile tidak memiliki user_id (data tidak valid)');
        }


        $karyawanFields = [
            'birth_date',
            'phone_number',
            'parent_phone_number',
            'address',
            'profile_link'
        ];

        $adminFields = [
            'team_id',
            'jobDesk_id',
            'program_id',
            'gender',
            'join_year',
        ];

        if ($user->role->name_role === 'Karyawan') {
            $userProfile->fill($request->only($karyawanFields));
        } else {
            $userProfile->fill($request->only(array_merge($karyawanFields, $adminFields)));
        }

        $service->handleExitService($userProfile);

        $userProfile->save();

        return response()->json([
            'message' => 'User profile berhasil di-update',
            'data' => $userProfile
        ]);
    }


public function store(CreateUserProfileRequest $request)
{
    $this->authorize('create', UserProfile::class);

    $user = auth()->user();
    $userProfile = new UserProfile();

    $karyawanFields = [
        'birth_date',
        'phone_number',
        'parent_phone_number',
        'address',
        'profile_link'
    ];

    $adminFields = [
        'team_id',
        'jobDesk_id',
        'program_id',
        'gender',
        'join_year',
    ];

    // Ambil data yang SUDAH divalidasi
    $data = $request->validated();

    if ($user->role->name_role === 'Karyawan') {
        $userProfile->fill(
            Arr::only($data, $karyawanFields)
        );
    } else {
        $userProfile->fill(
            Arr::only($data, array_merge($karyawanFields, $adminFields))
        );
    }

    $userProfile->user_id = $user->id;

    $userProfile->save();

    return response()->json([
        'message' => 'User profile berhasil dibuat',
        'data' => $userProfile
    ]);
}


    public function show(UserProfile $userProfile) {
        $this->authorize('view', $userProfile);

        return response()->json([
            'data' => $userProfile->load('user', 'team', 'jobDesk', 'program')
        ]);
    }

}