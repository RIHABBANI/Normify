<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NormController;
use App\Http\Controllers\NormChapterController;
use App\Http\Controllers\NormSubChapterController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);

Route::prefix('user')->group(function () {
    Route::get('/', [UserController::class, 'show']);
    Route::get('/{id}', [UserController::class, 'showById']);
});

Route::prefix('norm')->group(function () {
    Route::get('/', [NormController::class, 'show']);
    Route::get('/{id}', [NormController::class, 'showById']);
});

Route::prefix('norm-chapter')->group(function () {
    Route::get('/', [NormChapterController::class, 'show']);
    Route::get('/{id}', [NormChapterController::class, 'showById']);
});

Route::prefix('norm-sub-chapter')->group(function () {
    Route::get('/', [NormSubChapterController::class, 'show']);
    Route::get('/{id}', [NormSubChapterController::class, 'showById']);
});
