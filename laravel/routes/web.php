<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LineOAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/chat/test', 'App\Services\ChatGPTService@test')->name('chat.test');

// local test routes
if (config('app.env') == 'local') {
    Route::get('/login/test', function () {
        Auth::login(User::find(1));
        return redirect()->route('dashboard');
    });
}

Route::get('/', function () {
    return redirect()->route(RouteServiceProvider::HOME);
});

// line OAuth 2.1
Route::prefix('auth/line')
    ->controller(LineOAuthController::class)
    ->group(function () {
        // LINEの認証画面に遷移
        Route::get('/', 'redirectToProvider')->name('line.login');
        // 認証後にリダイレクトされるURL(コールバックURL)
        Route::get('/callback', 'handleProviderCallback');
    });

// Line messaging api
Route::post('/line/webhook/message', 'App\Http\Controllers\LineWebhookController@webhook')->name('line.webhook.message');

Route::middleware('auth')->group(function () {
    Route::get('/welcome', function () {
        return Inertia::render('Welcome');
    })->name('welcome');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'create'])->name('categories.create');
    Route::delete('/categories', [CategoryController::class, 'destroy'])->name('categories.destroy');
    Route::patch('/categories', [CategoryController::class, 'merge'])->name('categories.merge');
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::patch('/transactions', [TransactionController::class, 'update'])->name('transactions.update');
    Route::delete('/transactions', [TransactionController::class, 'destroy'])->name('transactions.destroy');
});

require __DIR__ . '/auth.php';
