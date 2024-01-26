<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'type'];

    // アクセサーを定義
    public function getTypeAttribute($value)
    {
        return ucfirst($value); // データベースに格納される値が小文字であることを前提としています
    }

    // バリデーション
    public static $rules = [
        'name' => 'required|string|max:255',
        'type' => 'required|in:income,expense',
    ];
}
