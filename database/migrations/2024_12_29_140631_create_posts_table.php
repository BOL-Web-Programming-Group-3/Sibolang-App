<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('title'); // Title of the post
            $table->text('content'); // Content of the post
            $table->enum('status', ['published', 'rejected', 'pending'])->default('pending'); // Status of the post
            $table->string('image')->nullable(); // Image path or filename (nullable)
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade'); // Foreign key reference to 'users' table
            $table->softDeletes(); // Deleted at column for soft deletes
            $table->timestamps(); // Created at and Updated at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}