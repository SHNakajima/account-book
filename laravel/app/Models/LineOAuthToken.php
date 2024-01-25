<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    /**
     * user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
