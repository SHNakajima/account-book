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

        $response = $client->completions()->create([
            'model' => 'gpt-3.5-turbo-instruct',
            'response_format' => ["type" => "json_object"],
            'messages' => [
                ["role" => "system", "content" => "You are a helpful assistant designed to output JSON. JSON has 3 attributes 'ammount', 'category', 'description'"],
                ["role" => "user", "content" => $text],
                ["role" => "user", "content" => "category must be chosen from the list 給料,ボーナス,電気代,ガス代,水道代,通信費,サブスク,食費,外食,日用品,趣味・娯楽費,衣服・服飾小物,美容費,書籍,医療費,医薬品,ガソリン,交通費,その他,ゲーム"]
            ],
            'max_tokens' => 6,
            'temperature' => 0
        ]);

        Log::debug(json_encode($response));

        try {
            return $response['choices'][0]['message']['content'];
        } catch (\Throwable $th) {
            return 'error: ' . $text;
        }

        $response->id; // 'cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7'
        $response->object; // 'text_completion'
        $response->created; // 1589478378
        $response->model; // 'gpt-3.5-turbo-instruct'

        foreach ($response->choices as $result) {
            $result->text; // '\n\nThis is a test'
            $result->index; // 0
            $result->logprobs; // null
            $result->finishReason; // 'length' or null
        }

        $response->usage->promptTokens; // 5,
        $response->usage->completionTokens; // 6,
        $response->usage->totalTokens; // 11

        $response->toArray(); // ['id' => 'cmpl-uqkvlQyYK7bGYrRHQ0eXlWi7', ...]


    }
}
