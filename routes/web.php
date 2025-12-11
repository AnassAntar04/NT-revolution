<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard accessible uniquement aux utilisateurs authentifiés
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Social Login
Route::get('auth/{provider}', [SocialController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [SocialController::class, 'handleProviderCallback']);

// Password Reset / Forget Password
Route::middleware('guest')->group(function () {
    // Formulaire pour demander un lien de réinitialisation
    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    // Envoyer le lien de réinitialisation par email
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // Formulaire pour saisir un nouveau mot de passe via le token
    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    // Soumettre le nouveau mot de passe
    Route::post('/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.update');
});

require __DIR__.'/auth.php';

use App\Http\Controllers\AdminProductController;

Route::get('/admin/products', [AdminProductController::class,'index'])->name('admin.products.index');
Route::get('/admin/products/create', [AdminProductController::class,'create'])->name('admin.products.create');
Route::post('/admin/products', [AdminProductController::class,'store'])->name('admin.products.store');
Route::get('/admin/products/{product}', [AdminProductController::class, 'show'])->name('admin.products.show');
Route::get('/admin/products/{product}/edit', [AdminProductController::class, 'edit'])->name('admin.products.edit');
Route::put('/admin/products/{product}', [AdminProductController::class, 'update'])->name('admin.products.update');
Route::delete('/admin/products/{product}', [AdminProductController::class, 'destroy'])->name('admin.products.destroy'); 

