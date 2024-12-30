<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('post_id')->constrained('posts')->onDelete('cascade'); // Foreign key to 'posts' table
            $table->text('content'); // Comment content
            $table->unsignedBigInteger('created_by'); // Reference to 'users' table

            // Explicitly name the foreign key to avoid duplication
            $table->foreign('created_by', 'comments_created_by_fk')
                ->references('id')->on('users')->onDelete('cascade');

            $table->timestamps(); // Laravel's created_at and updated_at fields
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}