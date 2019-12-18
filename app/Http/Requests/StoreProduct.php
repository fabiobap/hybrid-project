<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduct extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'prodCod' => 'required|unique:products,prodCod|string',
            'description' => 'string',
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,bmp'
        ];
    }
}
