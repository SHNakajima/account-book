{
  "type": "flex",
  "altText": "{{ count($transactions) }} 件の収支データを登録しました！",
  "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://iili.io/JMa5PG1.jpg",
      "size": "full",
      "aspectRatio": "20:8",
      "aspectMode": "cover"
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "{{ Auth::user()->name }} さんの収支データを登録しました",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm"
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [
            @foreach ($transactions as $transaction)
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "カテゴリ",
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "{{ $transaction->category->display_name }}",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "コメント",
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "{{ $transaction->description }}",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "text",
                    "text": "金額",
                    "size": "sm",
                    "color": "#555555",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": "{{ $transaction->amount_str }}",
                    "size": "sm",
                    "color": "#111111",
                    "align": "end"
                  }
                ]
              }
              @if(!$loop->last)
              ,
              {
                "type": "separator",
                "margin": "md"
              },
              @endif
            @endforeach
          ]
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "計： {{ count($transactions) }} 件",
              "color": "#aaaaaa",
              "size": "xs",
              "align": "end"
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "収支一覧で確認する",
            "uri": "{{ config('line.liff.endpoint') . '/transactions' }}"
          }
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": false
      }
    }
  }
}