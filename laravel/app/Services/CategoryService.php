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
                $validated,
                ['deleted_at' => null]
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
}
