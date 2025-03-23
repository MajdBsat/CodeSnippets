<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                "success" => false,
                "error" => "Incorrect email or password"
            ], 401);
        }
        $user = Auth::user();
        return response()->json([
                'status' => 'success',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ]);
    }
    function signup(Request $request){
        try{
            $request->validate([
                'full_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:1',
            ]);
            $user = new User;
            $user->full_name = $request["full_name"];
            $user->email = $request["email"];
            $user->password = bcrypt($request["password"]);
            $user->save();
            $user->token = Auth::login($user);
            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user
            ]);
        } catch (\Throwable $error) {
            return response()->json([
                "success" => false,
                "error" => "False credentials",
                "message" => $error->getMessage()
            ], 401);
        }
}}
