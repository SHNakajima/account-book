<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function list(Request $request): Response
    {
        $userId = Auth::id();

        // ログインユーザーのカテゴリを取得し、categories.typeでグループ化する
        $categories = User::find($userId)->categories()
            ->orderBy('name')
            ->get(['id', 'name', 'type']);

        // カテゴリを収入と支出にグループ化する
        $incomes = $categories->where('type', 'Income');
        $expenses = $categories->where('type', 'Expense');

        // dd(json_encode([
        //     'incomes' => $incomes,
        //     'expenses' => $expenses,
        // ]));

        return Inertia::render('Category/List', [
            'categories' => [
                'incomes' => $incomes,
                'expenses' => $expenses,
            ],
            'status' => session('status'),
        ]);
    }
}
