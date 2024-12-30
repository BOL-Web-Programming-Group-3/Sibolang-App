<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

require __DIR__.'/auth.php';
