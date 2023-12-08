<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            // Hash the password
            'password' => bcrypt($data['password']),
            'alamat' => $data['alamat'],
            'no_handphone' => $data['no_handphone'],
            'nim' => $data['nim'],
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'Signup success',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'Login success',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true,
            'message' => 'Logout success'
        ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
