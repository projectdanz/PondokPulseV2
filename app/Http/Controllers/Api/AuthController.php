<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    // Register
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:100',
            'birth_date' => 'required|date'
        ]);

        $random = rand(10, 99);

        // Register Email
        $username = Str::lower(Str::slug($request->name, ''));
        $email = $username . $random . '@pondokit.com';

        // Register Pass
        $raw_pass = $username . $request->birth_date . $random;

        // create user
        $user = User::create([
            'name' => $request->name,
            'email' => $email,
            'password' => Hash::make($raw_pass),
            'birth_date' => $request->birth_date,
        ]);

        // token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil',
            'email' => $email,
            'password' => $raw_pass, 
            'token' => $token,
        ], 201);
    }
    
    // Login
    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json([
                'message' => 'Email atau password yang anda masukan salah '
            ], 401);
        }

        $user = Auth::user();

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    // Logout
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
        ], 200);
    }

    public function me(Request $request){
        return response()->json($request->user(), 200);
    }
}
