<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

    public function __construct(ChatGPTService $chatGptService, LineMessageService $lineMessageService)
    {
        $this->lineBotUserId = config('line.message.bot_id');
        $this->chatGptService = $chatGptService;
        $this->lineMessageService = $lineMessageService;
    }

    public function webhook(Request $request)
    {
        Log::debug('webhook: reached', ['request' => $request->all()]);

        $data = $request->all();

        if ($data['destination'] !== $this->lineBotUserId) {
            Log::debug('Invalid destination');
            return abort(400, 'Bad Request');
        }

        foreach ($data['events'] as $event) {
            $this->processEvent($event);
        }

        Log::debug('Event processing completed');
        return response()->noContent();
    }

    private function processEvent($event)
    {
        Log::debug('Processing event', ['event' => $event]);

        if ($event['type'] === 'message') {
            $this->handleMessageWebhook($event);
        } else {
            Log::debug('Unsupported event type', ['type' => $event['type']]);
        }
    }

    private function handleMessageWebhook($event)
    {
        $source = $event['source'];
        $replyToken = $event['replyToken'];
        $text = $event['message']['text'];

        $lineToken = LineOAuthToken::where('line_user_id', $source['userId'])->first();

        if (is_null($lineToken)) {
            $replyText = "あなたはまだ登録されていません、まずはURLから登録をお願いします！ \n " . config('app.url');
            $this->lineMessageService->replyTextMessage($replyToken, $replyText);
            Log::debug('User not registered', ['event' => $event]);
            return;
        }

        $fromUser = $lineToken->user()->first();
        Auth::login($fromUser);
        $analyzed = $this->chatGptService->analyzeText($text);

        if (is_string($analyzed)) {
            $this->lineMessageService->replyTextMessage($replyToken, $analyzed);
        } else {
            $this->lineMessageService->replyMessageObject($replyToken, $analyzed);
        }

        Log::debug('Message processed', ['text' => $text, 'reply' => $analyzed]);
    }
}
