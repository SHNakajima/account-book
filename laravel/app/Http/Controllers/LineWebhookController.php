<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\LineOAuthToken;
use Illuminate\Support\Facades\Log;
use LINE\Clients\MessagingApi\Model\TextMessage;
use LINE\Laravel\Facades\LINEMessagingApi;

class LineWebhookController extends Controller
{

    private $lineBotUserId;

    public function __construct()
    {
        $this->lineBotUserId = config('line.message.bot_id');
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

        if (LineOAuthToken::where('line_user_id', $source['userId'])->first() !== null) {
            $replyText = "あなたは登録済みです。: $text";
        } else {
            $replyText = "あなたはまだ登録されていません、: $text";
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
