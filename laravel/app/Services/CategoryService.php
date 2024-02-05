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

    private $category;
    private $tran;
    private $user;


    // TODO:　プロバイダー化
    public function __construct(Category $category, User $user)
    {
        $this->category = $category;
        $this->user = $user;
    }

    /**
     * Create a new transaction.
     *
     * @param $transaction
     * @return Transaction
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
