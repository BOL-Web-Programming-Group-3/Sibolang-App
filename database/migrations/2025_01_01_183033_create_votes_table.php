<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVotesTable extends Migration
{
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // References the User table
            $table->foreignId('post_id')->constrained('posts')->onDelete('cascade'); // References the Post table
            $table->enum('vote_type', ['up', 'down']); // Either 'up' or 'down'
            $table->timestamps();

            // Ensure a user can vote once per post
            $table->unique(['user_id', 'post_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
