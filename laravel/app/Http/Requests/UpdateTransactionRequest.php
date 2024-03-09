<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTransactionRequest extends FormRequest
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
        return [
            'id' => 'required|numeric|exists:transactions',
            'amount' => 'required|numeric|min:0',
            'categoryId' => 'required|in:' . implode(',', $this->user()->categories->pluck('id')->toArray()),
            'description' => 'required|string|max:255',
        ];
    }
}
