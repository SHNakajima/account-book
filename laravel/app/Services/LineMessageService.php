<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use LINE\Clients\MessagingApi\Model\FlexBubble;
use LINE\Clients\MessagingApi\Model\FlexMessage;
use LINE\Laravel\Facades\LINEMessagingApi;
use LINE\Clients\MessagingApi\Model\TextMessage;
use LINE\Clients\MessagingApi\Model\ReplyMessageRequest;
use LINE\Clients\MessagingApi\Model\FlexContainer;

class LineMessageService
{

    // TODO:　プロバイダー化
    public function __construct()
    {
    }

    public function replyTextMessage($replyToken, $text)
    {
        $request = $this->createMessageRequestFromText($text, $replyToken);
        LINEMessagingApi::replyMessage($request);
    }

    public function replyMessageObject($replyToken, $messageObject)
    {
        Log::debug('replyMessageObject');
        Log::debug(json_encode($messageObject));
        $request = new ReplyMessageRequest([
            'replyToken' => $replyToken,
            'messages' => [$messageObject],
        ]);

        LINEMessagingApi::replyMessage($request);
    }

    public function createMessageRequestFromText($text, $replyToken)
    {
        $message = new TextMessage([
            'type' => 'text',
            'text' => $text
        ]);

        return new ReplyMessageRequest([
            'replyToken' => $replyToken,
            'messages' => [$message],
        ]);
    }

    public function createTransactionMessage($transactions): FlexMessage
    {

        collect($transactions)->each(function ($i) {
            return $i->append('amount_str');
        });
        return new FlexMessage(
            json_decode(
                view('json/flexMessage')
                    ->with(['transactions' => $transactions])
                    ->render()
            , true)
        );
    }
}
