<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'post_id',
        'vote_type',
    ];

    // Define the relationship between Vote and Post
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    // Define the relationship between Vote and User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
