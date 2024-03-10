<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\{
    Auth\LineOAuthController,
    CategoryController,
    DashboardController,
    LiffController,
    ProfileController,
    TransactionController,
    LineWebhookController
};
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ローカル環境専用ルート
if (config('app.env') == 'local') {
    Route::get('/login/test', function () {
        Auth::login(User::find(1));
        return redirect()->route('dashboard');
    });

    Route::get('/chat/test', 'App\Services\ChatGPTService@test')->name('chat.test');
}

// 基本ルート
Route::get('/', function () {
    return redirect()->route(RouteServiceProvider::HOME);
});

// LINE OAuth 2.1
Route::prefix('auth/line')->controller(LineOAuthController::class)->group(function () {
    Route::get('/', 'redirectToProvider')->name('line.login');
    Route::get('/callback', 'handleProviderCallback');
});

// Line messaging API
Route::post('/line/webhook/message', [LineWebhookController::class, 'webhook'])->name('line.webhook.message');

// 認証が必要なルート
Route::middleware('auth')->group(function () {
    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('welcome');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // LIFF エンドポイント
    Route::get('/liff', [LiffController::class, 'index'])->name('liff.index');

    // プロフィール関連
    Route::controller(ProfileController::class)->prefix('profile')->name('profile.')->group(function () {
        Route::get('/', 'edit')->name('edit');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });

    // カテゴリ関連
    Route::controller(CategoryController::class)->prefix('categories')->name('categories.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'init')->name('init');
        Route::post('/init', 'create')->name('create');
        Route::delete('/', 'destroy')->name('destroy');
        Route::patch('/', 'merge')->name('merge');
    });

    // トランザクション関連
    Route::controller(TransactionController::class)->prefix('transactions')->name('transactions.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::patch('/', 'update')->name('update');
        Route::delete('/', 'destroy')->name('destroy');
    });
});

require __DIR__ . '/auth.php';
