<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Category extends Model
{
    use SoftDeletes;

    protected $appends = ['type_japanese', 'display_name'];

    protected $fillable = ['user_id', 'name', 'type', 'deleted_at'];

    // バリデーション
    public static $rules = [
        'name' => 'required|string|max:255',
        'type' => 'required|in:income,expense',
    ];

    // アクセサーを定義
    public function getTypeAttribute($value)
    {
        return ucfirst($value);
    }

    public function getDisplayNameAttribute()
    {
        return is_null($this->deleted_at) ? $this->name : "未分類";
    }

    // 日本語のタイプを取得するアクセサ
    public function getTypeJapaneseAttribute()
    {
        return $this->type == 'Income' ? '収入' : '支出';
    }

    public function scopeAuthed(Builder $builder)
    {
        $builder->where('user_id', Auth::id());
    }
}
