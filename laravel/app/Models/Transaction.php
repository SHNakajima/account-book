<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $appends = ['amount_str', 'created_at_ymd'];

    protected $fillable = ['user_id', 'category_id', 'amount', 'description'];

    /**
     * Get the amount string for the transaction.
     *
     * @return string
     */
    public function getAmountStrAttribute()
    {
        $type = $this->category()->withTrashed()->first()->type;
        $amount = $this->amount;
        return ($type == 'Income') ? '+' . $amount : '-' . $amount;
    }

    /**
     * Get the formatted created date for the transaction.
     *
     * @return string
     */
    public function getCreatedAtYmdAttribute()
    {
        return Carbon::parse($this->created_at)->format('Y-m-d');
    }

    // リレーションシップの定義
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // リレーションシップの定義
    public function categoryTrashed()
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }

    public function scopeAuthed(Builder $builder)
    {
        $builder->where('user_id', Auth::id());
    }

    // バリデーション
    public static $rules = [
        'user_id' => 'required|integer',
        'category_id' => 'required|integer',
        'amount' => 'required|numeric',
        'description' => 'nullable|string|max:255',
    ];
}
