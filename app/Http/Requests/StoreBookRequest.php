<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => $this->name,
            'description' => $this->description,
            'penerbit' => $this->penerbit,
            'tanggal_terbit' => $this->tanggal_terbit,
            'stock' => $this->stock,
            'img' => $this->img,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
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
