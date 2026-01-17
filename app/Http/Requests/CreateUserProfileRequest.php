<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class CreateUserProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = $this->user();

    return [
        'birth_date' => [
            Rule::requiredIf($user->role->name_role === 'Karyawan'),
            'date',
        ],

        'phone_number' => [
            Rule::requiredIf($user->role->name_role === 'Karyawan'),
            'string',
            'max:20',
        ],

        'parent_phone_number' => ['nullable', 'string', 'max:20'],
        'address' => [
            Rule::requiredIf($user->role->name_role === 'Karyawan'),
            'string',
        ],
        'profile_link' => ['nullable', 'url'],

        // OPSIONAL UNTUK MANAGER / KOORDINATOR
        'team_id' => ['sometimes', 'exists:teams,id'],
        'jobDesk_id' => ['sometimes', 'exists:jobDesks,id'],
        'program_id' => ['sometimes', 'exists:programs,id'],
        'gender' => ['sometimes', 'in:Male,Female'],
        'join_year' => ['sometimes', 'digits:4'],
    ];
    }
}
