<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->user->name,
            'team' => $this->team?->name,
            'jobDesk' => $this->jobDesk?->name,
            'program' => $this->program?->name,
            'gender' => $this->gender,
            'join_year' => $this->join_year,
            'exit_year' => $this->exit_year,
        ];
    }
}
