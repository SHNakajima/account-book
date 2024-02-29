<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\LineOAuthToken;
use App\Services\ChatGPTService;
use App\Services\LineMessageService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LineWebhookController extends Controller
{
    private $lineBotUserId;
    private $chatGptService;
    private $lineMessageService;

    public function __construct(ChatGPTService $chatGPTService, LineMessageService $lineMessageService)
    {
        $this->lineBotUserId = config('line.message.bot_id');
        $this->chatGptService = $chatGPTService;
        $this->lineMessageService = $lineMessageService;
    }

    public function webhook(Request $request)
    {
        Log::debug('webhook: reached');
        Log::debug(json_encode($request->all()));

        $data = $request->all();
        $events = $data['events'];

        if ($data['destination'] === $this->lineBotUserId) {
            Log::debug('destination valid;');
            foreach ($events as $event) {
                Log::debug(json_encode($events));
                switch ($event['type']) {
                    case 'message':
                        $this->handleMessageWebhook($event);
                        break;
                    default:
                        return abort(400, 'Bad Request');
                }
            }
        }

        Log::debug('event end');
        return response('');
    }

    private function handleMessageWebhook($event)
    {
        $replyText = null;
        $messageObject = null;
        $source = $event['source'];
        $replyToken = $event['replyToken'];
        $text = $event['message']['text'];
        Log::debug($source);

        $lineToken = LineOAuthToken::where('line_user_id', $source['userId'])->first();
        if ($lineToken !== null) {
            // 文字列を処理し、Transactionデータに挿入
            $fromUser = $lineToken->user()->first();
            Log::debug($fromUser->name);
            Auth::login($fromUser);
            $analyzed = $this->chatGptService->analyzeText($text);
            Log::debug($analyzed);
            if (is_string($analyzed)) {
                $replyText = $analyzed;
            } else {
                $messageObject = $analyzed;
            }
        } else {
            $replyText = "あなたはまだ登録されていません、まずはURLから登録をお願いします！ \n " . config('app.url');
        }
        Log::debug($event);
        if (!is_null($replyText)) {
            $this->lineMessageService->replyTextMessage($replyToken, $replyText);
        } else if (!is_null($messageObject)) {
            $this->lineMessageService->replyMessageObject($replyToken, $messageObject);
        }
        return response('');
    }
}
