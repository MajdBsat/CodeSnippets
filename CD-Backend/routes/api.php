<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Snippets\SnippetController;
use App\Http\Controllers\User\UserController;

Route::group(["prefix" => "v1"], function(){
    Route::post('/signup', [AuthController::class, "signup"]);
    Route::post('/login', [AuthController::class, "login"]);
    Route::get("/usersnippets", [UserController::class, "userSnippets"]);

    Route::group(["middleware" => "auth:api"], function () {
        Route::group(["prefix" => "snippets"], function () {
            Route::get("/allsnippets/{id?}", [SnippetController::class, "getSnippets"]);
            Route::post("/addsnippet", [SnippetController::class, "addSnippet"]);
            Route::delete("/deletesnippet/{id}", [SnippetController::class, "deleteSnippet"]);
            Route::post("/editsnippet", [SnippetController::class, "editSnippet"]);
        });
    });

});


