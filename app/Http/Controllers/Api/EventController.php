<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{

    public function index(Request $request)
    {
        $this->authorize('viewAny', Event::class);

        $perPage = min($request->per_page ?? 10, 50);

        $events = Event::paginate($perPage);

        return response()->json([
            'message' => 'Event berhasil diambil',
            'data' => $events->items(),
            'meta' => [
                'current_page' => $events->currentPage(),
                'last_page' => $events->lastPage(),
                'per_page' => $events->perPage(),
                'total' => $events->total(),
            ]
        ], 200);
    }


    public function show($id){
        $event = Event::findOrFail($id);

        $this->authorize('view', $event);
        
        return response()->json([
            'message' => 'Event berhasil diambil',
            'data' => $event
        ], 200);
    }

    public function store(Request $request){
        $this->authorize('create', Event::class);

        $request->validate([
            'name_event' => 'required|string|max:255',
            'description_event' => 'nullable|string',
            'date_event' => 'nullable|date',
        ]);

        $event = Event::create($request->only('name_event', 'description_event', 'date_event'));
        return response()->json([
            'message' => 'Event berhasil dibuat',
            'data' => $event
        ], 201);
    }

    public function update(Request $request, $id){
        $event = Event::findOrFail($id);

        $this->authorize('update', $event);

        $request->validate([
            'name_event' => 'nullable|string|max:255',
            'description_event' => 'nullable|string',
            'date_event' => 'nullable|date',
        ]);

        $event->update($request->only('name_event', 'description_event', 'date_event'));
        return response()->json([
            'message' => 'Event berhasil diupdate',
            'data' => $event
        ], 200);
    }

    public function destroy($id){
        $event = Event::findOrFail($id);

        $this->authorize('delete', $event);

        $event->delete();
        return response()->json([
            'message' => 'Event berhasil dihapus',
        ], 200);
    }   
}
