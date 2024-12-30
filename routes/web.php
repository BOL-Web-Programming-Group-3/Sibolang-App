<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostAdminController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->middleware(['auth']);

Route::resource('posts', PostController::class);

Route::get('/forums', function () {
    return Inertia::render('Forum');
});

Route::get('/forums/{id}', function ($id) {
    return Inertia::render('ForumDetail', [
        'id' => $id,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::patch('admin/posts/status', [PostAdminController::class, 'updateStatus'])
    ->middleware(['auth', 'verified'])
    ->name('patch.updateStatus');

Route::resource('comments', CommentController::class)->middleware(['auth']);

Route::prefix('admin')->group(function () {
    Route::resource('posts', PostAdminController::class)->middleware(['auth', 'verified']);

    Route::get('forums', function () {
        return Inertia::render('AdminForum');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('forums/{id}', function ($id) {
        return Inertia::render('AdminForumDetail', [
            'id' => $id,
        ]);
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('users', function () {
        return Inertia::render('AdminUser');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';