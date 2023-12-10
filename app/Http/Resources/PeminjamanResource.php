<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeminjamanResource extends JsonResource
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
            'user_id' => $this->user_id,
            'detail_peminjaman' => DetailPeminjamanResource::collection($this->details),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}