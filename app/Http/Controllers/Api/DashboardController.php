<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request){
        return response()->json([
            'message' => 'dashboard umum',
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'role' => $request->user()->role->name_role,
            ]
        ], 200);
    }

    //Manager
    public function manager(){
            return response()->json([
                'role' => 'manager',
                'message' => 'dashboard manager',
                'menus' => [
                    'home',
                    'kelola karyawan' => [
                        'kpi karyawan',
                        'absensi'
                    ],
                    'kelola koordinator' => [
                        'kpi koordinator',
                        'absensi'
                    ],
                    'kelola team',
                    'add events',
                    'add jobdesk',
                    'profile'
                ],
            ], 200);
        }

        //Koordinator
        public function koordinator(){
            return response()->json([
                'role' => 'koordinator',
                'message' => 'dashboard koordinator',
                'menus' => [
                    'home',
                    'kelola karyawan' => [
                        'kpi karyawan',
                        'absensi karyawan'
                    ],
                    'add absensi',
                    'profile'
                ],
            ], 200);
        }

        //karyawan 
        public function karyawan(){
            return response()->json([
                'role' => 'karyawan',
                'message' => 'dashboard karyawan',
                'menus' => [
                    'home',
                    'add kpi',
                    'profile'
                ],
            ], 200);
        }
}
