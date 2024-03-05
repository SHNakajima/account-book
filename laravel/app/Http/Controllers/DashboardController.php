<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Services\TransactionService;

class DashboardController extends Controller
{

    private $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index(Request $request)
    {
        // dd($request->header('X-Inertia-Partial-Data'), $request->all());

        $ym = $request->get('ym', Carbon::now()->format('Ym'));

        $monthlyCategoryPercentages = $this->transactionService->getMonthlyCategoryPercentages($ym);

        $latestSummary = $this->transactionService->getRecentMonthlyIncomeExpense($ym);

        return Inertia::render('Dashboard/index', [
            'monthlyCategoryPercentages' => $monthlyCategoryPercentages,
            'latestSummary' => $latestSummary,
            'ym' => $ym
        ]);
    }
}
