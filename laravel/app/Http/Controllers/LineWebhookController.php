<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\LineOAuthToken;
use App\Services\ChatGPTService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use LINE\Clients\MessagingApi\Model\TextMessage;
use LINE\Laravel\Facades\LINEMessagingApi;

class LineWebhookController extends Controller
{

    private $lineBotUserId;
    private $chatGptService;

    public function __construct(ChatGPTService $chatGPTService)
    {
        $this->lineBotUserId = config('line.message.bot_id');
        $this->chatGptService = $chatGPTService;
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
                        break;
                }
            }
        }

        Log::debug('event end');
        return response('');
    }

    private function handleMessageWebhook($event)
    {
        $source = $event['source'];
        $replyToken = $event['replyToken'];
        $text = $event['message']['text'];
        Log::debug($source);

        $fromUser = LineOAuthToken::where('line_user_id', $source['userId'])->first()->user()->first();
        Log::debug($fromUser);
        if ($fromUser !== null) {
            // 文字列を処理し、Transactionデータに挿入
            Log::debug($fromUser->name);
            Auth::login($fromUser);
            $replyText = $this->chatGptService->analyzeText($text);
        } else {
            $replyText = "あなたはまだ登録されていません、まずはURLから登録をお願いします！ \n " . config('app.url');
        }
        Log::debug($event);
        $this->replyTextMessage($replyToken, $replyText);
        return response('');
    }

    private function replyTextMessage($replyToken, $text)
    {
        $message = new TextMessage([
            'type' => 'text',
            'text' => $text
        ]);

        LINEMessagingApi::replyMessage([
            'replyToken' => $replyToken,
            'messages' => [$message],
        ]);
    }
}
