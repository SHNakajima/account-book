<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LineOAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TransactionController;

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


Route::get('/', function () {
    return redirect()->route('login');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
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


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/category', [CategoryController::class, 'list'])->name('category.list');
    Route::post('/category', [CategoryController::class, 'create'])->name('category.create');
    Route::get('/transaction', [TransactionController::class, 'list'])->name('transaction.list');
});

require __DIR__.'/auth.php';
