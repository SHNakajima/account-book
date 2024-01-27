<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use GuzzleHttp\Client;
use App\Models\LineOAuthToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LineOAuthController extends Controller
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

    public function redirectToProvider()
    {
        $response = [
            'redirectUri' => $this->getRedirectUrl()
        ];

        if (request()->inertia()) {
            return redirect()->back()->with('responseData', $response);
        } else {
            return response()->json($response);
        }
    }

    public function handleProviderCallback(Request $request)
    {
        Log::debug(json_encode($request->all()));
        $code = $request->query('code');
        $token_info = $this->fetchTokenInfo($code);
        $user_info = $this->fetchUserInfo($token_info->access_token);

        // アクセストークンの保存・更新
        $token = LineOAuthToken::where('line_user_id', $user_info->userId)->first();
        if ($token === null) {

            // ログインチェック
            $user = User::create([
                'name' => $user_info->displayName,
                'picture_url' => $user_info->pictureUrl
            ]);

            // トークン登録
            LineOAuthToken::create(
                [
                    'user_id' => $user->id,
                    'line_user_id' => $user_info->userId,
                    'access_token' => $token_info->access_token,
                    'token_type' => $token_info->token_type,
                    'refresh_token' => $token_info->refresh_token,
                    'expires_at' => Carbon::now()->addSeconds($token_info->expires_in),
                    'scope' => $token_info->scope,
                    'id_token' => $token_info->id_token
                ]
            );
        } else {
            // トークンの期限が切れていたら更新
            // ログイン
            $user = $token->user;
        }

        Auth::guard('web')->login($user, true);
        return redirect()->route('dashboard');
    }

    private function fetchUserInfo($access_token)
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

    private function fetchTokenInfo($code)
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

    private function sendRequest($base_uri, $method, $path, $headers, $form_params = null)
    {
        try {
            $client = new Client($base_uri);
            if ($form_params) {
                $response = $client->request($method, $path, $form_params, $headers);
            } else {
                $response = $client->request($method, $path, $headers);
            }
        } catch (\Exception $ex) {
            Log::error($ex->getMessage());
        }
        return json_decode($response->getbody()->getcontents());
    }
}
