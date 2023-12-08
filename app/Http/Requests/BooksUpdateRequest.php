<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BooksUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        $buku = $this->route('buku');
        if ($buku && $this->user()->can('update', $buku)) {
            return true;
        }
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'penerbit' => 'required|string',
            'tanggal_terbit' => 'nullable|date',
            'stock' => 'required|integer',
            'img' => 'nullable|string',
        ];
    }
}
