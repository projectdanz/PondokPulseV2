<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::get('dashboard', [DashboardController::class, 'index']);
        
        //Manager
        Route::middleware('role:manager')->group(function () {
            Route::get('dashboard/manager', [DashboardController::class, 'manager']); 
        });
        
        //Koordinator
        Route::middleware('role:koordinator')->group(function () {
            Route::get('dashboard/koordinator', [DashboardController::class, 'koordinator']); 
        });
        
        //Karyawan
        Route::middleware('role:karyawan')->group(function () {
            Route::get('dashboard/karyawan', [DashboardController::class, 'karyawan']); 
        });
        
        Route::post('logout', [AuthController::class, 'logout']);
    });
});