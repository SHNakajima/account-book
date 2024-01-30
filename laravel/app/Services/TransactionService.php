<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Str;

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

  public function createTransaction($transaction)
  {
    dd($transaction);
    return;
  }
}
