<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TransactionService
{
    /**
     * Create a new transaction.
     *
     * @param $transaction
     * @return Transaction
     * @throws ValidationException
     */
    public function createTransaction($transaction): Transaction
    {
        Log::debug("createTransaction");
        Log::debug(json_encode($transaction));

        // ユーザーが所有するカテゴリ名を取得します。
        $userCategories = Auth::user()->categories;

        // バリデーションルールを定義します。
        $rules = [
            'amount' => 'required|numeric|min:0', // 0以上の数値
            'category' => 'required|in:' . implode(',', $userCategories->pluck('name')->toArray()), // ユーザーが所有するカテゴリの中に存在するか
            'description' => 'required|string|max:255', // 文字列で255文字以内
        ];

        // バリデーションを実行します。
        $validator = validator($transaction, $rules);

        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->all());
        }

        // Transactionを作成します。
        $createdTransaction = Transaction::create([
            'user_id' => Auth::id(),
            'category_id' => $userCategories->where('name', $transaction['category'])->value('id'),
            'amount' => $transaction['amount'],
            'description' => $transaction['description'],
        ]);

        return $createdTransaction;
    }

    public function mergeCategory($beforeId, $afterId)
    {
        // dd($beforeId, $afterId);
        return Transaction::authed()
            ->where('category_id', $beforeId)
            ->update(['category_id' => $afterId]);
    }

    public function deleteTransactionById($transactionId)
    {
        Transaction::authed()
            ->find($transactionId)
            ->delete();
    }

    public function updateTransaction($data)
    {
        return Transaction::authed()
            ->find($data['id'])
            ->update([
                'amount' => $data['amount'],
                'category_id' => $data['categoryId'],
                'description' => $data['description'],
            ]);
    }

    public function getMonthlyCategoryPercentages(String $yyyymm)
    {
        $startOfMonth = $this->ymToDate($yyyymm)->startOfMonth();
        $endOfMonth = $this->ymToDate($yyyymm)->endOfMonth();

        $categoryAmounts = Transaction::authed()
            ->select('categories.name', DB::raw('SUM(transactions.amount) as total_amount'))
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->whereBetween('transactions.created_at', [$startOfMonth, $endOfMonth])
            ->whereNull('transactions.deleted_at')
            ->groupBy('categories.name')
            ->get();

        $totalAmount = $categoryAmounts->sum('total_amount');

        $categoryPercentages = array();
        foreach ($categoryAmounts as $categoryAmount) {
            $percentage = round(($categoryAmount->total_amount / $totalAmount) * 100);
            array_push($categoryPercentages, [
                'name' => $categoryAmount->name,
                'value' => $percentage,
                'label' => $categoryAmount->name . ':' . $percentage . '%'
            ]);
        }

        return $categoryPercentages;
    }

    private function ymToDate(String $yyyymm)
    {
        return Carbon::createFromFormat('Ymd', $yyyymm . '01');
    }
}
