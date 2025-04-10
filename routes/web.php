<?php

use App\Http\Controllers\EntryExitController;
use App\Http\Controllers\ParkingSpaceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'name' => Crypt::decrypt(Auth::user()->name),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('entrances-exits', [EntryExitController::class, 'index'])->name('entrances-exits.index');

    Route::get('/parking-spaces', [ParkingSpaceController::class, 'index'])->name('parking_spaces.index');
    Route::post('/parking-spaces/register', [ParkingSpaceController::class, 'register'])->name('parking_spaces.register');
    Route::post('/parking-spaces/checkout', [ParkingSpaceController::class, 'checkout'])->name('parking_spaces.checkout');
    Route::get('/parking-spaces/report', [ParkingSpaceController::class, 'report'])->name('parking_spaces.report');
    // Route::post('/registros', [EntryExitController::class, 'store'])->name('registros.store');
    // Route::put('/registros/{id}', [EntryExitController::class, 'update'])->name('registros.update');

    // Route::get('parking-spaces', [ParkingSpaceController::class, 'index'])->name('parking_spaces.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
