<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\RakController;
use App\Http\Controllers\CarteController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\PanneController;
use App\Http\Controllers\RameController;

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

Route::prefix('utilisateurs')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::post('/', [UserController::class, 'store']);
    Route::get('/{utilisateur}', [UserController::class, 'show']);
    Route::put('/{utilisateur}', [UserController::class, 'update']);
    Route::delete('/{utilisateur}', [UserController::class, 'destroy']);
});

Route::prefix('cartes')->group(function () {
    Route::get('/', [CarteController::class, 'index']);
    Route::post('/', [CarteController::class, 'store']);
    Route::get('/{carte}', [CarteController::class, 'show']);
    Route::put('/{carte}', [CarteController::class, 'update']);
    Route::delete('/{carte}', [CarteController::class, 'destroy']);
});

Route::prefix('interventions')->group(function () {
    Route::get('/', [InterventionController::class, 'index']);
    Route::post('/', [InterventionController::class, 'store']);
    Route::get('/{intervention}', [InterventionController::class, 'show']);
    Route::put('/{intervention}', [InterventionController::class, 'update']);
    Route::delete('/{intervention}', [InterventionController::class, 'destroy']);
});

Route::prefix('maintenances')->group(function () {
    Route::get('/', [MaintenanceController::class, 'index']);
    Route::post('/', [MaintenanceController::class, 'store']);
    Route::get('/{maintenance}', [MaintenanceController::class, 'show']);
    Route::put('/{maintenance}', [MaintenanceController::class, 'update']);
    Route::delete('/{maintenance}', [MaintenanceController::class, 'destroy']);
});

Route::prefix('pannes')->group(function () {
    Route::get('/', [PanneController::class, 'index']);
    Route::post('/', [PanneController::class, 'store']);
    Route::get('/{panne}', [PanneController::class, 'show']);
    Route::put('/{panne}', [PanneController::class, 'update']);
    Route::delete('/{panne}', [PanneController::class, 'destroy']);
});

Route::prefix('raks')->group(function () {
    Route::get('/', [RakController::class, 'index']);
    Route::post('/', [RakController::class, 'store']);
    Route::get('/{rak}', [RakController::class, 'show']);
    Route::put('/{rak}', [RakController::class, 'update']);
    Route::delete('/{rak}', [RakController::class, 'destroy']);
});

Route::prefix('rames')->group(function () {
    Route::get('/', [RameController::class, 'index']);
    Route::post('/', [RameController::class, 'store']);
    Route::get('/{rame}', [RameController::class, 'show']);
    Route::put('/{rame}', [RameController::class, 'update']);
    Route::delete('/{rame}', [RameController::class, 'destroy']);
});