<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use OpenAI;

class ChatGPTService
{
    private $client;
    private $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $this->client = OpenAI::client($yourApiKey);
        $this->transactionService = $transactionService;
    }

    public function analyzeText($text)
    {
        // TODO:チャットボットの機能追加
        return $this->handleCreateTransactionMessage($text);
    }

    public function handleCreateTransactionMessage($text)
    {
        $userCategories = Auth::user()->categories;
        if ($userCategories->count() == 0) {
            return "カテゴリーがまだ登録されていないようです。。URLから登録をお願いします！ \n" . route('categories.index');
        }
        $categoryListStr = $userCategories->pluck('name')->implode(',');
        // dd($categoryListStr);
        // TODO: プロンプトのテンプレート化
        $response = $this->client->chat()->create([
            'model' => 'gpt-3.5-turbo-0613',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => 'inputを適切な数の家計簿のtransactionデータに分解し、Jsonに変換してください。カテゴリはcategoryListから適切に選択してください。inputに金額が含まれない場合は処理しないでください。 \n # input \n ' . $text . ' \n # categoryList \n ' . $categoryListStr,
                ],
            ],
            'functions' => [
                [
                    'name' => 'transactionJson',
                    'description' => '抽出された特徴を JSON として処理します。',
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
                                        'amount' => [
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

        $jsonObj = null;
        foreach ($response->choices as $key => $choice) {
            try {
                // Log::debug($choice->message->functionCall->arguments);
                $responseJson = $choice->message->functionCall->arguments;
                $jsonObj = json_decode($responseJson);

                if (json_last_error() === JSON_ERROR_NONE && $jsonObj->transactions !== null) {
                    $transactionArray = $jsonObj->transactions;
                    foreach ($transactionArray as $transaction) {
                        $this->transactionService->createTransaction((array)$transaction);
                    }
                    return count($transactionArray) . "つの収支データを登録しました！";
                } else {
                    return "すいません、AIの気分で登録できませんでした。少し文言を変えて登録しなおしてください。。";
                }
            } catch (\Throwable $th) {
                dump($th);
                return $th->getMessage();
            }
        }

        return "エラーです。";
    }

    public function getModels()
    {
        // Model	Input	Output
        // gpt-4-0125-preview	$0.01 / 1K tokens	$0.03 / 1K tokens
        // gpt-3.5-turbo-1106	$0.0010 / 1K tokens	$0.0020 / 1K tokens

        $response = $this->client->models()->list();

        dd($response->toArray()); // ['object' => 'list', 'data' => [...]]
    }

    public function test()
    {
        // $this->getModels();
        // dd(request('text'));
        dd($this->analyzeText(request('text')));
    }
}
