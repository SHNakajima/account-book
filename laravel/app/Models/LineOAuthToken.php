<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LineOAuthToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'line_user_id',
        'access_token',
        'token_type',
        'refresh_token',
        'expires_at',
        'scope',
        'id_token'
    ];

    protected $attributes = [
        'user',
    ];

    /**
     * user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
