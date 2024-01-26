<?php

namespace App\Services;

use Illuminate\Support\Str;

class LineOAuthService
{
    private const LINE_OAUTH_URI = 'https://access.line.me/oauth2/v2.1/authorize?';
    private const LINE_TOKEN_API_URI = 'https://api.line.me/oauth2/v2.1/';
    private const LINE_PROFILE_API_URI = 'https://api.line.me/v2/';
    private $client_id;
    private $client_secret;
    private $callback_url;

    // TODO:　プロバイダー化
    public function __construct() {
        $this->client_id = Config('line.login.client_id');
        $this->client_secret = Config('line.login.client_secret');
        $this->callback_url = Config('line.login.callback_url');
    }

    public function getRedirectUrl() 
    {
        $csrf_token = Str::random(32);
        $query_data = [
            'response_type' => 'code',
            'client_id' => $this->client_id,
            'redirect_uri' => $this->callback_url,
            'state' => $csrf_token,
            'scope' => 'profile openid',
        ];
        $query_str = http_build_query($query_data, '', '&');
        return self::LINE_OAUTH_URI . $query_str;
    }
}
