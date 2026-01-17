<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
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
        $role = auth()->user()->role->name_role;
        
        $rules = [
            'birth_date' => 'sometimes|date',
            'phone_number' => 'sometimes|string',
            'parent_phone_number' => 'sometimes|string',
            'address' => 'sometimes|string',
            'profile_link' => 'sometimes|string|url',
        ];
        
        if(in_array($role, ['Manager', 'Koordinator'])) {
            $rules = array_merge($rules, [
                'team_id' => 'sometimes|exists:teams,id',
                'jobDesk_id' => 'sometimes|exists:jobDesks,id',
                'program_id' => 'sometimes|exists:programs,id',
                'gender' => 'sometimes|in:Male,Female',
                'join_year' => 'sometimes|integer|min:2000|max:' . date('Y'),
            ]);
        }

        return $rules;
    }
}
