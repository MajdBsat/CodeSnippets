<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userSnippets(Request $request)
    {
        try {
            $userSnippets = Auth::user()->snippets()->with('tags')->get();
            return response()->json([
                "success" => true,
                "message" => "single user snippets",
                "data" => $userSnippets
            ], 200);
        } catch (\Throwable $error) {
            return response()->json([
                "success" => false,
                "error" => "Error",
                "message" => $error->getMessage()
            ], 401);
        }
    }
}
