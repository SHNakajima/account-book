<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use App\Services\CategoryService;
use App\Services\TransactionService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    private $categoryService;
    private $transactionService;

    public function __construct(CategoryService $categoryService, TransactionService $transactionService)
    {
        $this->categoryService = $categoryService;
        $this->transactionService = $transactionService;
    }

    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $userId = Auth::id();

        $categories = User::find($userId)->categories()
            ->orderBy('name')
            ->get(['id', 'name', 'type']);

        $incomes = $categories->where('type', 'Income');
        $expenses = $categories->where('type', 'Expense');


        return Inertia::render('Categories/Index', [
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

        return Redirect::route('categories.index');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'id' => 'required|numeric|exists:categories',
            'name' => 'required|string|exists:categories',
        ]);

        $this->categoryService->deleteCategory($validatedData);

        return Redirect::route('categories.index');
    }

    public function merge(Request $request): RedirectResponse
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'id' => 'required|numeric|exists:categories',
            'targetId' => 'required|numeric|exists:categories,id',
        ]);

        $this->transactionService->mergeCategory($validatedData['id'], $validatedData['targetId']);

        return Redirect::route('categories.index');
    }
}
