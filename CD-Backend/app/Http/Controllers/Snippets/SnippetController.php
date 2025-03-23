<?php

namespace App\Http\Controllers\Snippets;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Snippet;

class SnippetController extends Controller
{
    public function getSnippets(Request $request)
    {

        try {
            if ($request["id"]) {
                $result = Snippet::find($request["id"]);
                if(!$snippet){
                return response()->json([
                    "success" => false,
                    "message" => "Snippet not found"
                ], 401);
                }
                return response()->json([
                    "success" => true,
                    "message" => "Snippet found!",
                    "data" => $snippet
                ], 200);
            } else {
                return response()->json([
                    "success" => true,
                    "error" => false,
                    "message" => "Showing all snippets",
                    "data" => Snippet::all()
                ], 200);
            }
        } catch (\Exception $error) {
            return response()->json([
                "success" => false,
                "error" => true,
                "message" => $error->getMessage()
            ], 401);
        }
    }

    public function addSnippet(Request $request)
    {
        try {

            $request->validate([
                'content' => 'required|string|min:1',
                'language' => 'required|string|min:1',
                'keywords' => 'required|string|min:1',
            ]);

            $snippet = new Snippet();
            $snippet->user_id = Auth::id();
            $snippet->content = $request["content"];
            $snippet->language = $request["language"];
            $snippet->keywords = $request["keywords"];
            $snippet->save();

            return response()->json([
                "success" => true,
                "message" => "Snippet added succesfully!",
                "data" => $snippet
            ], 200);
        } catch (\Throwable $error) {
            return response()->json([
                "success" => false,
                "error" => true,
                "message" => $error->getMessage()
            ], 401);
        }
    }

    public function editSnippet(Request $request)
    {
        try {
            $snippet = Snippet::find($request["id"]);

            if (!$snippet) {
                return response()->json([
                    "success" => false,
                    "error" => true,
                    "message" => "Snippet Not Found"
                ], 401);
            }
            $snippet->content = $request["content"] ?? $snippet->content;
            $snippet->language = $request["language"] ?? $snippet->language;
            $snippet->keywords = $request["keywords"] ?? $snippet->keywords;
            $snippet->is_favorite = filter_var($request->input('is_favorite'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

            $snippet->save();


            return response()->json([
                "success" => true,
                "message" => "Snippet updated!",
                "snippet" =>  $snippet
            ]);
        } catch (\Throwable $error) {
            return response()->json([
                "success" => false,
                "error" => true,
                "message" => $error->getMessage()
            ], 401);
        }
    }

    public function deleteSnippet(Request $request)
    {
        try {
            $userId = Auth::id();
            $snippet = Snippet::find($request["id"]);

            if ($snippet->user_id !== $userId) {
                return response()->json([
                    "success" => false,
                    "error" => true,
                    "message" => "You are not authorized to delete!"
                ], 401);
            }
            $snippet->delete();
            return response()->json([
                "success" => true,
                "message" => "Deleted successfully!"
            ], 200);
        } catch (\Throwable $error) {
            return response()->json([
                "success" => false,
                "error" => true,
                "message" => $error->getMessage()
            ], 401);
        }
    }
}
