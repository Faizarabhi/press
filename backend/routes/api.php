<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;


// 🔐 Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ Accessible à tous (auth ou pas si besoin)
Route::get('/posts/validated', [PostController::class, 'validated']);
Route::get('/posts-public/{id}', [PostController::class, 'validatedPost']);


 Route::middleware(['auth.jwt'])->get('/me', function () {
    return response()->json([
        'user' => auth()->user(),
        'role' => auth()->user()->role,
    ]);
});

// 👨‍💻 Reporter only
Route::middleware(['auth.jwt', 'role:reporter'])->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}/edit-content', [PostController::class, 'updateContent']);

    Route::get('/posts-reporter', [PostController::class, 'index']);
});


// 🧑‍🏫 Editor only
Route::middleware(['auth.jwt', 'role:editor'])->group(function () {
    Route::put('/posts/{post}/update-status', [PostController::class, 'updateStatus']);
    Route::get('/posts', [PostController::class, 'index']);

    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});

// 🔁 Reporter + Editor
Route::middleware(['auth.jwt', 'role:reporter,editor'])->group(function () {
    Route::get('/posts/{post}', [PostController::class, 'show']);
    Route::get('/', [PostController::class, 'dashboard']);
    Route::get('/categories', [CategoryController::class, 'index']);


});
