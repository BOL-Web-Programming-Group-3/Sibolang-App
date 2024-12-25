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

  Route::get('forums', function () {
      return Inertia::render('AdminForum');
  });

  Route::get('users', function () {
      return Inertia::render('AdminUser');
  });
});

require __DIR__.'/auth.php';
