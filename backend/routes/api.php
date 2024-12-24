<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserInfoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NormController;
use App\Http\Controllers\NormChapterController;
use App\Http\Controllers\NormSubChapterController;
use App\Http\Controllers\ExigencyController;
use App\Http\Controllers\ActionController;

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
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/register', [UserController::class, 'register']);

Route::prefix('user')->group(function () {
    Route::get('/', [UserInfoController::class, 'show']);
    Route::get('/{id}', [UserInfoController::class, 'showById']);
});

Route::prefix('norms')->group(function () {
    Route::get('/', [NormController::class, 'show']);
    Route::get('/{id}', [NormController::class, 'showById']);
});

Route::prefix('norm-chapters')->group(function () {
    Route::get('/', [NormChapterController::class, 'show']);
    Route::get('/{id}', [NormChapterController::class, 'showById']);
});

Route::get('/norm-sub-chapters/chapter', [NormSubChapterController::class, 'showByChapter']);

Route::prefix('norm-sub-chapters')->group(function () {
    Route::get('/', [NormSubChapterController::class, 'show']);
    Route::get('/{id}', [NormSubChapterController::class, 'showById']);
});

Route::prefix('exigencies')->group(function () {
    Route::get('/', [ExigencyController::class, 'show']);
    Route::get('/{id}', [ExigencyController::class, 'showById']);
    Route::get('/chapter/subchapter', [ExigencyController::class, 'showByChapterAndSubChapter']);
});

Route::prefix('actions')->group(function () {
    Route::get('/', [ActionController::class, 'show']);
    Route::get('/{id}', [ActionController::class, 'showById']);
});