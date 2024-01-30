<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use OpenAI;

class ChatGPTService
{
    private $client;

    public function __construct()
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $this->client = OpenAI::client($yourApiKey);
    }

    public function analyzeText($text)
    {
        $allCategories = User::find('1')->categories()->get(['name'])->map(function ($c) {
            return $c->name;
        })->implode(', ');
        // $allCategories = User::find('1');
        dump($text);
        dump($allCategories);

        // TODO: プロンプトのテンプレート化
        $response = $this->client->chat()->create([
            'model' => 'gpt-3.5-turbo-0613',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => 'inputを家計簿のtransactionデータのJsonに変換してください。カテゴリはcategoryListから適切に選択してください \n # input \n ' . $text . ' \n # categoryList \n ' . $allCategories,
                ],
            ],
            'functions' => [
                [
                    'name' => 'transactionJson',
                    'description' => '家計簿のtransactionデータのJson',
                    'parameters' => [
                        'type' => 'object',
                        'properties' => [
                            'transactions' => [
                                'type' => 'array',
                                'description' => 'inputから生成された家計簿のtransactionデータの配列。',
                                'uniqueItems' => true,
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'ammount' => [
                                            'type' => 'number',
                                            'description' => '収入もしくは支出金額',
                                        ],
                                        'category' => [
                                            'type' => 'string',
                                            'description' => 'カテゴリ',
                                        ],
                                        'description' => [
                                            'type' => 'string',
                                            'description' => '家計簿の備考情報',
                                        ],
                                    ],
                                ],
                                'minItems' => 0,
                                'maxItems' => 10,
                            ],
                        ],
                        'required' => ['transactions'],
                    ],
                ],
            ],
        ]);

        // $response = $this->client->threads()->createAndRun(
        //     [
        //         'assistant_id' => 'asst_OcI43agGi01zeuSBmQYdSxTo',
        //         'thread' => [
        //             'messages' =>
        //                 [
        //                     [
        //                         'role' => 'user',
        //                         'content' => '給料で1万円',
        //                     ],
        //                 ],
        //         ],
        //     ],
        // );

        dump($response);
        return;

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

    public function getModels()
    {
        // Model	Input	Output
        // gpt-4-0125-preview	$0.01 / 1K tokens	$0.03 / 1K tokens
        // gpt-3.5-turbo-1106	$0.0010 / 1K tokens	$0.0020 / 1K tokens

        $response = $this->client->models()->list();

        $response->object; // 'list'

        foreach ($response->data as $result) {
            $result->id; // 'gpt-3.5-turbo-instruct'
            $result->object; // 'model'
            // ...
        }

        dd($response->toArray()); // ['object' => 'list', 'data' => [...]]
    }

    public function test()
    {
        // $this->getModels();
        // dd(request('text'));
        $this->analyzeText(request('text'));
    }
}
