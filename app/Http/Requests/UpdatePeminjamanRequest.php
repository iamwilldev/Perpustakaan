<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePeminjamanRequest extends FormRequest
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
            'buku_id' => 'required|integer',
            'user_id' => 'required|integer',
            'tanggal_pinjam' => 'required|date|after_or_equal:date',
            'tanggal_kembali' => 'required|date|after:date',
        ];
    }
}
