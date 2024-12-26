<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/posts/{id}', function ($id) {
  return Inertia::render('PostDetail', [
      'id' => $id,
  ]);
});

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
  Route::get('cultures', function () {
      return Inertia::render('AdminCulture');
  });

  Route::get('cultures/{id}', function ($id) {
    return Inertia::render('AdminCultureDetail', [
        'id' => $id,
    ]);
  });

  Route::get('forums', function () {
      return Inertia::render('AdminForum');
  });

  Route::get('forums/{id}', function ($id) {
    return Inertia::render('AdminForumDetail', [
        'id' => $id,
    ]);
  });

  Route::get('users', function () {
      return Inertia::render('AdminUser');
  });

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
