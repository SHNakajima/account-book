<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
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
        $ym = $request->get('ym', Carbon::now()->format('Ym'));

        $monthlyCategoryPercentages = $this->transactionService->getMonthlyCategoryPercentages($ym);

        // dd($monthlyCategoryPercentages);
        return Inertia::render('Dashboard/index', [
            'monthlyCategoryPercentages' => $monthlyCategoryPercentages,
            'ym' => $ym
        ]);
    }
}
