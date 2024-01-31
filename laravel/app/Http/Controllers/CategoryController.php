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

        $categories = User::find($userId)->categories()
            ->orderBy('name')
            ->get(['id', 'name', 'type']);

        $incomes = $categories->where('type', 'Income');
        $expenses = $categories->where('type', 'Expense');


        return Inertia::render('Category/List', [
            'categories' => [
                'incomes' => $incomes,
                'expenses' => $expenses,
            ],
            'status' => session('status'),
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        // dd(json_decode($request->getContent(), true));
        $validatedData = $request->validate([
            'name' => 'required|string|unique:categories,name,NULL,id,user_id,' . Auth::id(),
            'type' => 'required|in:income,expense',
        ]);

        Category::create([
            'user_id' => Auth::id(),
            'name' => $validatedData['name'],
            'type' => $validatedData['type'],
        ]);

        return Redirect::route('category.list');
    }

    public function delete(Request $request): RedirectResponse
    {
        // dd(json_decode($request->getContent(), true));
        $validatedData = $request->validate([
            'id' => 'required|numeric|exists:categories',
            'name' => 'required|string|exists:categories',
        ]);

        Category::where([
            'user_id' => Auth::id(),
            ...$validatedData,
        ])->first()->delete();

        return Redirect::route('category.list');
    }

}
