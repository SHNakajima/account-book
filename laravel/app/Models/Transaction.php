<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    protected $appends = ['created_at_ymd'];

    protected $fillable = ['user_id', 'category_id', 'amount', 'description'];

    protected function amountStr(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                $type = $this->category->type;
                $amount = number_format($attributes['amount']);
                return ($type == 'income') ? '+' . $amount : '-' . $amount;
            }
        );
    }

    protected function amountSigned(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                $type = $this->category->type;
                $amount = $attributes['amount'];
                return ($type == 'income') ? $amount :  $amount * -1;
            }
        );
    }

    protected function createdAtYmd(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => Carbon::parse($attributes['created_at'])->format('Y-m-d')
        );
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class)->withTrashed();
    }

    public function scopeAuthed(Builder $builder)
    {
        $builder->where('transactions.user_id', Auth::id());
    }

    // バリデーション
    public static $rules = [
        'user_id' => 'required|integer',
        'category_id' => 'required|integer',
        'amount' => 'required|numeric',
        'description' => 'nullable|string|max:255',
    ];
}
