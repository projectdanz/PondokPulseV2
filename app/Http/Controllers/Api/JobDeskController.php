<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobDesk;

class JobDeskController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', JobDesk::class);

        return response()->json([
            'message' => 'Data Jobdesk berhasil diambil',
            'data' => JobDesk::all()
        ], 200);
    }

    public function show($id){
        $jobDesk = JobDesk::findOrFail($id);
        $this->authorize('view', $jobDesk);

        return response()->json([
            'message' => 'Data Jobdesk berhasil diambil',
            'data' => $jobDesk
        ], 200);
    }

    public function store(Request $request){
        $this->authorize('create', JobDesk::class);

        $request->validate([
            'name_job' => 'required',
            'description_job' => 'nullable',
        ]);

        $jobDesk = JobDesk::create([
            'name_job' => $request->name_job,
            'description_job' => $request->description_job,
        ]);

        return response()->json([
            'message' => 'Data Jobdesk berhasil dibuat',
            'data' => $jobDesk
        ], 201);
    }

    public function update(Request $request, $id){
        $jobDesk = JobDesk::findOrFail($id);
        $this->authorize('update', $jobDesk);

        $request->validate([
            'name_job' => 'required',
            'description_job' => 'nullable',
        ]);

        $jobDesk->update([
            'name_job' => $request->name_job,
            'description_job' => $request->description_job,
        ]);

        return response()->json([
            'message' => 'Data Jobdesk berhasil diupdate',
            'data' => $jobDesk->fresh()
        ], 200);
    }

    public function destroy($id){
        $jobDesk = JobDesk::findOrFail($id);
        $this->authorize('delete', $jobDesk);

        $jobDesk->delete();

        return response()->json([
            'message' => 'Data Jobdesk berhasil dihapus',
            'data' => $jobDesk
        ], 200);
    }
}
    