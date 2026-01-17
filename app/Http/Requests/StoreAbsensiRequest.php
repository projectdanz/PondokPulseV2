<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAbsensiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'required|in:hadir,izin,sakit,alpa',
            'event_id' => 'required|exists:events,id',
            'note' => 'nullable|string|max:500',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'User wajib diisi',
            'user_id.exists' => 'User tidak ditemukan',
            'date.required' => 'Tanggal wajib diisi',
            'date.date' => 'Format tanggal tidak valid',
            'status.required' => 'Status absensi wajib diisi',
            'status.in' => 'Status harus: hadir, izin, sakit, atau alpa',
            'event_id.required' => 'Event wajib diisi',
            'event_id.exists' => 'Event tidak ditemukan',
            'note.max' => 'Catatan maksimal 500 karakter',
        ];
    }
}
