<?php

namespace App\Rules;

use App\Models\Category;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CategoryNameUnique implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        
        $category = Category::authed()
        ->where('name', $value)
        ->first();
        
        if (!empty($category)) {
            if ($category->type == 'Income') {
                $fail(__('すでに収入カテゴリに存在します。'));
            } else {
                $fail(__('すでに支出カテゴリに存在します。'));
            }
        }
    }
}
