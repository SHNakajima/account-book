<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        if ($users === null) {
            Log::info('no users!');
            return;
        }

        // カテゴリから取得
        $categories = Category::all();
        if ($categories === null) {
            Log::info('no categories!');
            return;
        }

        foreach ($users as $user) {
            Log::info('make seed datas on : ' . $user->name);
            foreach ($categories as $category) {
                $transactionDate = Carbon::now()->subDays(rand(1, 30)); // 過去30日以内のランダムな日付
                $amount = rand(100, 10000); // 100から10000のランダムな金額
                $description = $category->name . "に使いました。";
                
                Transaction::create([
                    'user_id' => $user->id,
                    'category_id' => $category->id,
                    'amount' => $amount,
                    'description' => $description,
                    'transaction_date' => $transactionDate,
                ]);
            }
        }
    }
}
