<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use LINE\Clients\MessagingApi\Model\ReplyMessageRequest;
use LINE\Clients\MessagingApi\Model\FlexMessage;
use OpenAI;

/**
 * ChatGPTを利用したテキスト解析に関するビジネスロジックを提供するサービスクラス。
 */
class ChatGPTService
{
    private $client;
    private $transactionService;
    private $lineMessageService;

    /**
     * コンストラクタ
     *
     * @param TransactionService $transactionService トランザクションサービスのインスタンス
     * @param LineMessageService $lineMessageService LINEメッセージサービスのインスタンス
     */
    public function __construct(TransactionService $transactionService, LineMessageService $lineMessageService)
    {
        $yourApiKey = getenv('OPENAI_API_KEY');
        $this->client = OpenAI::client($yourApiKey);
        $this->transactionService = $transactionService;
        $this->lineMessageService = $lineMessageService;
    }

    /**
     * テキストを解析し、結果を返します。
     *
     * @param string $text 解析するテキスト
     * @return string|FlexMessage 解析結果
     */
    public function analyzeText($text): string|FlexMessage
    {
        return $this->handleCreateTransactionMessage($text);
    }

    /**
     * テキストからトランザクションを作成し、結果を返します。
     *
     * @param string $text 解析するテキスト
     * @return string|FlexMessage トランザクション作成結果
     */
    public function handleCreateTransactionMessage($text): string|FlexMessage
    {
        $userCategories = Auth::user()->categories;
        if ($userCategories->isEmpty()) {
            return "カテゴリーがまだ登録されていないようです。。URLから登録をお願いします！ \n" . route('categories.index');
        }

        $categoryListStr = $userCategories->pluck('name')->implode(',');
        $prompt = $this->generatePrompt($text, $categoryListStr);
        $response = $this->client->chat()->create($prompt);

        return $this->processResponse($response);
    }

    /**
     * プロンプトを生成します。
     *
     * @param string $text
     * @param string $categoryListStr
     * @return array
     */
    private function generatePrompt($text, $categoryListStr): array
    {
        return [
            'model' => 'gpt-3.5-turbo-0613',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => "inputを適切な数の家計簿のtransactionデータに分解し、Jsonに変換してください。カテゴリはcategoryListから適切に選択してください。inputに金額が含まれない場合は空の配列を返してください。 \n # input \n $text \n # categoryList \n $categoryListStr",
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
        ];
    }

    /**
     * OpenAIの応答を処理します。
     *
     * @param $response
     * @return string|FlexMessage
     */
    private function processResponse($response): string|FlexMessage
    {
        foreach ($response->choices as $choice) {
            try {
                $responseJson = $choice->message->functionCall->arguments;
                $jsonObj = json_decode($responseJson);

                if (json_last_error() === JSON_ERROR_NONE && !empty($jsonObj->transactions)) {
                    $transactionArray = $jsonObj->transactions;
                    $created = [];
                    foreach ($transactionArray as $transaction) {
                        $created[] = $this->transactionService->createTransaction((array)$transaction);
                    }
                    if (count($transactionArray) > 0) {
                        return $this->lineMessageService->createTransactionMessage($created);
                    }
                } else {
                    return "すいません、AIの気分で登録できませんでした。少し文言を変えて登録しなおしてください。。";
                }
            } catch (\Throwable $th) {
                return $th->getMessage();
            }
        }

        return "エラーです。";
    }

    /**
     * 利用可能なモデルのリストを取得します。
     *
     * @return void
     */
    public function getModels()
    {
        // Model    Input    Output
        // gpt-4-0125-preview    $0.01 / 1K tokens    $0.03 / 1K tokens
        // gpt-3.5-turbo-1106    $0.0010 / 1K tokens    $0.0020 / 1K tokens

        $response = $this->client->models()->list();

        dd($response->toArray()); // ['object' => 'list', 'data' => [...]]
    }

    /**
     * テスト関数
     *
     * @return void
     */
    public function test()
    {
        $res = $this->analyzeText(request('text'));
        dd($res);
    }
}
