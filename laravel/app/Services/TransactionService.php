<?php

namespace App\Services;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class TransactionService
{

    private $transaction;
    private $user;


    // TODO:　プロバイダー化
    public function __construct(Transaction $transaction, User $user)
    {
        $this->transaction = $transaction;
        $this->user = $user;
    }

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
            'category_id' => $userCategories->where('name', $transaction['category'])->first()->id,
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
}
