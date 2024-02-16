<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Rules\CategoryNameUnique;
use App\Services\CategoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\TransactionService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

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

    public function init(Request $request): RedirectResponse
    {
        // dd(json_decode($request->getContent(), true));
        $validated = $request->validate([
            'categoryNum' => 'required|numeric',
        ]);

        $this->categoryService->initCategories($validated);

        return Redirect::route('categories.index');
    }

    public function create(Request $request): RedirectResponse
    {
        // dd(json_decode($request->getContent(), true));
        $validatedData = $request->validate([
            'name' => new CategoryNameUnique(),
            'type' => 'required|in:income,expense',
        ]);

        $this->categoryService->createCategory([
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
