<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'alamat' => $this->alamat,
            'no_handphone' => $this->no_handphone,
            'nim' => $this->nim,
            'email' => $this->email,
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
            'alamat' => 'required|string',
            'no_handphone' => 'required|string',
            'nim' => 'required|integer',
            'email' => 'nullable|string',
        ];
    }
}
