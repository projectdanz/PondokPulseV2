<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\KpiController;
use App\Http\Controllers\Api\PeriodeController;
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

        //Team
        Route::apiResource('teams', TeamController::class);

        Route::post('teams/assign-member', [TeamController::class, 'assignMember']);
        Route::post('teams/unassign-member', [TeamController::class, 'unassignMember']);

        //Event
        Route::apiResource('events', EventController::class);

        //Periode
        Route::apiResource('periodes', PeriodeController::class);

        Route::apiResource('periodes.kpis', KpiController::class)->only('store', 'update', 'destroy');

        //Kpi
        Route::get('kpis', [KpiController::class, 'index']);
        Route::get('kpis/{kpi}', [KpiController::class, 'show']);
    });
});