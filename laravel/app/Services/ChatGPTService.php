<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use OpenAI;

class ChatGPTService
{
    public function analyzeText($text)
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $client = OpenAI::client($yourApiKey);

        $response = $client->models()->list();

        $response->object; // 'list'

        foreach ($response->data as $result) {
            $result->id; // 'gpt-3.5-turbo-instruct'
            $result->object; // 'model'
            // ...
        }

        Log::debug(json_encode($response->toArray()));

        // $client->davi

        // $result = $client->chat()->create([
        //     'model' => 'gpt-4',
        //     'messages' => [
        //         ['role' => 'user', 'content' => 'Hello!'],
        //     ],
        // ]);

        // echo $result->choices[0]->message->content; // Hello! How can I assist you today?
    }
}
