<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateTransactionRequest;
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
        $transactions = User::find(Auth::id())
            ->transactions()
            ->with('category')
            ->latest()
            ->get()
            ->each->append('amount_str');

        $categories = Auth::user()->categories;

        // dump(json_decode(json_encode($transactions)));

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

    public function update(UpdateTransactionRequest $request): RedirectResponse // Changed this line
    {
        $validated = $request->validated(); // Changed this line
        $this->transactionService->updateTransaction($validated);

        return redirect()->route('transactions.index');
    }
}
