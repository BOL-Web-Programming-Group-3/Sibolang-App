<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ForumAdminController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\PostAdminController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home Route
Route::get('/', function () {
    return Inertia::render('Home');
})->middleware(['auth']);

// User Posts Routes
Route::resource('posts', PostController::class)->names([
    'index' => 'user.posts.index',
    'create' => 'user.posts.create',
    'store' => 'user.posts.store',
    'show' => 'user.posts.show',
    'edit' => 'user.posts.edit',
    'update' => 'user.posts.update',
    'destroy' => 'user.posts.destroy',
]);

// User Forums Routes
Route::resource('forums', ForumController::class)->names([
    'index' => 'user.forum.index',
    'create' => 'user.forum.create',
    'store' => 'user.forum.store',
    'show' => 'user.forum.show',
    'edit' => 'user.forum.edit',
    'update' => 'user.forum.update',
    'destroy' => 'user.forum.destroy',
]);

// About Route
Route::get('/about', function () {
    return Inertia::render('About');
});

// Comments Routes
Route::resource('comments', CommentController::class);

Route::prefix('admin')->group(function () {
    // Admin Posts Update Status
    Route::patch('posts/status', [PostAdminController::class, 'updateStatus'])
        ->middleware(['auth', 'verified'])
        ->name('admin.posts.updateStatus');

    // Admin Posts Routes
    Route::resource('posts', PostAdminController::class)->middleware(['auth', 'verified'])->names([
        'index' => 'admin.posts.index',
        'create' => 'admin.posts.create',
        'store' => 'admin.posts.store',
        'show' => 'admin.posts.show',
        'edit' => 'admin.posts.edit',
        'update' => 'admin.posts.update',
        'destroy' => 'admin.posts.destroy',
    ]);

    // Admin Forums Update Status
    Route::patch('forums/status', [ForumAdminController::class, 'updateStatus'])
        ->middleware(['auth', 'verified'])
        ->name('admin.forums.updateStatus');

    // Admin Forums Routes
    Route::resource('forums', ForumAdminController::class)->middleware(['auth', 'verified'])->names([
        'index' => 'admin.forums.index',
        'create' => 'admin.forums.create',
        'store' => 'admin.forums.store',
        'show' => 'admin.forums.show',
        'edit' => 'admin.forums.edit',
        'update' => 'admin.forums.update',
        'destroy' => 'admin.forums.destroy',
    ]);

    Route::get('users', function () {
        return Inertia::render('AdminUser');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
