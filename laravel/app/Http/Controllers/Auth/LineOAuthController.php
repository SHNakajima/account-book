<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LineOAuthToken;
use App\Models\User;
use App\Services\LineOAuthService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LineOAuthController extends Controller
{
    private $lineOAuthService;

    // TODO:　プロバイダー化
    public function __construct(LineOAuthService $lineOAuthService)
    {
        $this->lineOAuthService = $lineOAuthService;
    }

    // LINE認証画面へリダイレクト
    public function redirectToProvider()
    {
        $response = [
            'redirectUri' => $this->lineOAuthService->getRedirectUrl()
        ];

        if (request()->inertia()) {
            return redirect()->back()->with('responseData', $response);
        } else {
            return response()->json($response);
        }
    }

    // LINE認証のコールバック
    public function handleProviderCallback(Request $request)
    {
        // Log::debug(json_encode($request->all()));
        $code = $request->query('code');
        $token_info = $this->lineOAuthService->fetchTokenInfo($code);
        $user_info = $this->lineOAuthService->fetchUserInfo($token_info->access_token);

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

        $redirectRoute = $user->hasCategory() ? 'dashboard' : 'welcome';

        Auth::guard('web')->login($user, true);
        return redirect()->route($redirectRoute);
    }
}
