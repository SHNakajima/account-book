<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class LineOAuthService
{
    private const LINE_OAUTH_URI = 'https://access.line.me/oauth2/v2.1/authorize?';
    private const LINE_TOKEN_API_URI = 'https://api.line.me/oauth2/v2.1/';
    private const LINE_PROFILE_API_URI = 'https://api.line.me/v2/';
    private $client_id;
    private $client_secret;
    private $callback_url;

    // TODO:　プロバイダー化
    public function __construct()
    {
        $this->client_id = Config('line.login.client_id');
        $this->client_secret = Config('line.login.client_secret');
        $this->callback_url = Config('line.login.callback_url');
    }

    /**
     * LINE OAuth認証のURIを取得します。
     *
     * @return string LINE OAuth認証のURI
     */
    public function getOauthUri(): string
    {
        return $this::LINE_OAUTH_URI;
    }

    /**
     * リダイレクトURLを取得します。
     *
     * @return string リダイレクトURL
     */
    public function getRedirectUrl(): string
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

    /**
     * ユーザー情報を取得します。
     *
     * @param string $access_token アクセストークン
     * @return mixed ユーザー情報
     */
    public function fetchUserInfo($access_token)
    {
        $base_uri = ['base_uri' => self::LINE_PROFILE_API_URI];
        $method = 'GET';
        $path = 'profile';
        $headers = [
            'headers' =>
            [
                'Authorization' => 'Bearer ' . $access_token
            ]
        ];
        $user_info = $this->sendRequest($base_uri, $method, $path, $headers);
        return $user_info;
    }

    /**
     * トークン情報を取得します。
     *
     * @param string $code コード
     * @return mixed トークン情報
     */
    public function fetchTokenInfo($code)
    {
        $base_uri = ['base_uri' => self::LINE_TOKEN_API_URI];
        $method = 'POST';
        $path = 'token';
        $headers = [
            'headers' =>
            [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ]
        ];
        $form_params = [
            'form_params' =>
            [
                'code'          => $code,
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secret,
                'redirect_uri'  => $this->callback_url,
                'grant_type'    => 'authorization_code'
            ]
        ];
        $token_info = $this->sendRequest($base_uri, $method, $path, $headers, $form_params);
        return $token_info;
    }

    /**
     * リクエストを送信します。
     *
     * @param array $base_uri ベースURI
     * @param string $method メソッド
     * @param string $path パス
     * @param array $headers ヘッダー
     * @param array|null $form_params フォームパラメータ
     * @return mixed レスポンス
     */
    private function sendRequest($base_uri, $method, $path, $headers, $form_params = null)
    {
        try {
            $client = new Client($base_uri);
            if ($form_params) {
                // $response = $client->request($method, $path, $form_params, $headers); // TODO: header不要か確認
                $response = $client->request($method, $path, $form_params);
            } else {
                $response = $client->request($method, $path, $headers);
            }
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
            return json_decode($ex);
        }
        return json_decode($response->getbody()->getcontents());
    }
}
