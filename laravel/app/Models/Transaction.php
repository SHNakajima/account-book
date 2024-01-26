<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['user_id', 'category_id', 'amount', 'description', 'transaction_date'];

    // リレーションシップの定義
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // バリデーション
    public static $rules = [
        'user_id' => 'required|integer',
        'category_id' => 'required|integer',
        'amount' => 'required|numeric',
        'description' => 'nullable|string|max:255',
        'transaction_date' => 'required|date',
    ];
}
