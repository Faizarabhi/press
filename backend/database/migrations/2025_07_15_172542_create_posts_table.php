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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image')->nullable();
            $table->enum('status', ['Draft', 'Pending', 'Approved', 'Rejected'])->default('Draft');
            $table->text('rejection_comment')->nullable();
            $table->foreignId('categorie_id')->constrained('categories')->onDelete('restrict');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamp('published_at')->nullable();
            $table->text('content');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
