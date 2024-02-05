<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
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
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $userId = Auth::id();

        $transactions = Transaction::authed()
            ->with(['category' => function ($query) {
                return $query->withTrashed();
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        // dd(json_encode($transactions));

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'status' => session('status'),
        ]);
    }

    public function destroy(Request $request): Response
    {
        dd($request);
    }
}
