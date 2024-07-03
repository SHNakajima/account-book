# AI家計簿

<p align="center">
  <img src="./laravel/public/images/icon/app_icon.png" alt="AI家計簿アイコン" width="200" height="200">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react">
  <img src="https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white" alt="openai">
  <img src="https://img.shields.io/badge/Line-00C300?style=for-the-badge&logo=line&logoColor=white" alt="line">
</p>

AI家計簿は、 _誰でも続けられる家計簿_ をモットーに開発されたWebアプリケーションです。

# ✨ 主な機能

## 1. 👤 データ管理

- LINEログインなので面倒な登録は必要ありません

## 2. 🤖 AIアシスタント・チャットボット

![LINEmessagingAPIでの収支データ追加](./note/img/LINEmessagingAPIでの収支データ追加.png)

- LINEで瞬時に収支記録
- AI支出パターン分析（Coming Soon!）
- 家計改善提案（Coming Soon!）
- Q&A（Coming Soon!）

## 3. 📊 ダッシュボード

![ダッシュボード](./note/img/ダッシュボード.png)

月単位での収支データのサマリを表示します。

- 収支推移グラフ
- 収支サマリー
- 支出内訳円グラフ

## 4. 💳 収支管理

![収支一覧](./note/img/収支一覧.png)

- 簡単な編集・削除機能

## 5. 🏷️ カテゴリ設定

![カテゴリ一覧](./note/img/カテゴリ一覧.png)

- カスタムカテゴリの作成・編集

# 🛠️ 使用技術

| 技術                                                                                                     | 用途                 |
| -------------------------------------------------------------------------------------------------------- | -------------------- |
| ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) | バックエンド         |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)      | フロントエンド       |
| ![ChatGPT](https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)  | AI                   |
| ![LINE](https://img.shields.io/badge/Line-00C300?style=for-the-badge&logo=line&logoColor=white)          | メッセージ・ログイン |

# 🚀 環境構築

<details>
<summary>📘 クリックで表示</summary>

1. **クローン**:

   ```bash
   git clone https://github.com/SHNakajima/account-book.git
   ```

2. **セットアップ**:

   ```bash
   composer install
   npm install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   ```

3. **起動**:
   ```bash
   npm run dev
   php artisan serve
   ```

</details>

# 🤝 問い合わせ

[GitHub issues](https://github.com/SHNakajima/account-book/issues)でお気軽にご連絡ください。

- 新しいアイデア
- 改善点がありましたら
- 質問

を受け付けています。
