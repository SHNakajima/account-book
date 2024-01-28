<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $appends = ['amount_str', 'created_at_ymd'];

    protected $fillable = ['user_id', 'category_id', 'amount', 'description', 'transaction_date'];

    /**
     * Get the amount string for the transaction.
     *
     * @return string
     */
    public function getAmountStrAttribute()
    {
        $type = $this->category->type;
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

    // バリデーション
    public static $rules = [
        'user_id' => 'required|integer',
        'category_id' => 'required|integer',
        'amount' => 'required|numeric',
        'description' => 'nullable|string|max:255',
        'transaction_date' => 'required|date',
    ];
}
