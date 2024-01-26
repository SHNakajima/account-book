<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    protected $fillable = ['user_id', 'category_id', 'amount', 'start_date', 'end_date'];

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
        'start_date' => 'required|date',
        'end_date' => 'required|date',
    ];
}
