<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('snippets', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('content');
            $table->string('language');
            $table->string('keywords');
            $table->boolean('is_favorite')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('snippets');
    }
};
