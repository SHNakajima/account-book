<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $appends = ['type_japanese'];

    protected $fillable = ['user_id', 'name', 'type'];

    // アクセサーを定義
    public function getTypeAttribute($value)
    {
        return ucfirst($value); // データベースに格納される値が小文字であることを前提としています
    }

    // 日本語のタイプを取得するアクセサ
    public function getTypeJapaneseAttribute()
    {
        return $this->type == 'Income' ? '収入' : '支出';
    }

    // バリデーション
    public static $rules = [
        'name' => 'required|string|max:255',
        'type' => 'required|in:income,expense',
    ];
}
