<?php

return [
    'login' => [
        'client_id' => env('LINE_CHANNEL_ID'),
        'client_secret' => env('LINE_CHANNEL_SECRET'),
        'callback_url' => env('LINE_CALLBACK_URL')
    ],

    'message' => [
        'channel_token' => env('LINE_BOT_CHANNEL_ACCESS_TOKEN'),
        'channel_id' => env('LINE_BOT_CHANNEL_ID'),
        'channel_secret' => env('LINE_BOT_CHANNEL_SECRET'),
        'bot_id' => env('LINE_MESSAGE_BOT_ID')
    ]
];
