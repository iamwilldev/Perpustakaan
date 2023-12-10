<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailPeminjamanResource extends JsonResource
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
            'peminjaman_id' => $this->peminjaman_id,
            'books_id' => $this->books_id,
            'tgl_peminjaman' => $this->tgl_peminjaman,
            'tgl_kembali' => $this->tgl_kembali,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
