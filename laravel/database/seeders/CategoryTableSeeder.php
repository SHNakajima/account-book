<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\User;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::first()->get();
        if ($user === null) {
            return;
        }

        $categories = [
            '給料' => 'income',
            'ボーナス' => 'income',
            '電気代' => 'expense',
            'ガス代' => 'expense',
            '水道代' => 'expense',
            '通信費' => 'expense',
            'サブスク' => 'expense',
            '食費' => 'expense',
            '外食' => 'expense',
            '日用品' => 'expense',
            '趣味・娯楽費' => 'expense',
            '衣服・服飾小物' => 'expense',
            '美容費' => 'expense',
            '書籍' => 'expense',
            '医療費' => 'expense',
            '医薬品' => 'expense',
            'ガソリン' => 'expense',
            '交通費' => 'expense',
            'その他' => 'expense',
            'ゲーム' => 'expense',
        ];

        foreach ($categories as $name => $type) {
            Category::create([
                'user_id' => $user->id,
                'name' => $name,
                'type' => $type,
            ]);
        }
    }
}
