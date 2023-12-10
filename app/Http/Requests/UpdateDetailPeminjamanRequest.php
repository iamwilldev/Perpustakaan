<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDetailPeminjamanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $peminjaman = $this->route('peminjaman');
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
            'peminjaman_id' => 'required|integer',
            'book_id' => 'required|integer',
            'tanggal_pinjam' => 'required|date|after_or_equal:date',
            'tanggal_kembali' => 'required|date|after:date',
        ];
    }
}
