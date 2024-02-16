<?php

namespace App\Services;

use App\Models\Category;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CategoryService
{
    /**
     * Create a new category.
     *
     * @param $validated
     * @throws ValidationException
     */
    public function createCategory($validated)
    {
        Log::debug("createCategory");

        Category::withTrashed()
            ->updateOrCreate(
                collect($validated)->only(['user_id', 'name'])->toArray(),
                ['deleted_at' => null, 'type' => $validated['type']]
            );
    }

    /**
     * Create a new category.
     *
     * @param $validated
     * @throws ValidationException
     */
    public function deleteCategory($validated)
    {
        Log::debug("deleteCategory");

        Category::where([
            'user_id' => Auth::id(),
            ...$validated,
        ])->first()->delete();
    }

    public function initCategories($validated)
    {

        $categories = [
            '給料' => 'income',
            'ボーナス' => 'income',
            '電気代' => 'expense',
            'ガス代' => 'expense',
            '水道代' => 'expense',
            '通信費' => 'expense',
            'サブスク' => 'expense',
            '食費' => 'expense',
            '外食' => 'expense',
            '日用品' => 'expense',
            '趣味・娯楽費' => 'expense',
            '衣服・服飾小物' => 'expense',
            '美容費' => 'expense',
            '書籍' => 'expense',
            '医療費' => 'expense',
            '医薬品' => 'expense',
            'ガソリン' => 'expense',
            '交通費' => 'expense',
            'その他' => 'expense',
            'ゲーム' => 'expense',
        ];

        foreach ($categories as $name => $type) {
            $this->createCategory([
                'user_id' => Auth::id(),
                'name' => $name,
                'type' => $type,
            ]);
        }
    }
}
