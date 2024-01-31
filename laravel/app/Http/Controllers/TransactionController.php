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
    public function list(Request $request): Response
    {
        $userId = Auth::id();

        $transactions = User::find($userId)->transactions()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        // dd(json_encode($transactions));

        return Inertia::render('Transaction/List', [
            'transactions' => $transactions,
            'status' => session('status'),
        ]);
    }
}
