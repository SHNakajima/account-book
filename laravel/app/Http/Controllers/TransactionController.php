<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use App\Services\TransactionService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    private $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $transactions = Auth::user()->transactions()
            ->with(['category' => function ($query) {
                return $query->withTrashed();
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = Auth::user()->categories;

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'allCategories' => $categories,
            'status' => session('status'),
        ]);
    }

    public function destroy(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'id' => 'required|numeric|exists:transactions'
        ]);

        $this->transactionService->deleteTransactionById($validated['id']);

        return redirect()->route('transactions.index');
    }

    public function update(Request $request): RedirectResponse
    {
        // {"id":2,"description":"ボーナスでの臨時収入です","categoryId":2,"amount":1557}
        // dd($request, implode(',', Auth::user()->categories->pluck('id')->toArray()));
        $validated = $request->validate([
            'id' => 'required|numeric|exists:transactions',
            'amount' => 'required|numeric|min:0', // 0以上の数値
            'categoryId' => 'required|in:' . implode(',', Auth::user()->categories->pluck('id')->toArray()), // ユーザーが所有するカテゴリの中に存在するか
            'description' => 'required|string|max:255', // 文字列で255文字以内
        ]);

        $this->transactionService->updateTransaction($validated);

        return redirect()->route('transactions.index');
    }
}
