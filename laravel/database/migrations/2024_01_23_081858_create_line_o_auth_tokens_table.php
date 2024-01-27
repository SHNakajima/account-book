<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('line_o_auth_tokens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('line_user_id')->unique();
            $table->string('access_token');
            $table->string('token_type');
            $table->string('refresh_token');
            $table->date('expires_at');
            $table->string('scope');
            $table->text('id_token');
            $table->timestamps();

            // 外部キー制約の追加
            // Integrity constraint violation: 19 FOREIGN KEY constraint failed
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('line_o_auth_tokens');
    }
};
