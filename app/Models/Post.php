<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'status',
        'image',
        'created_by',
    ];

    // Define the relationship between Post and User
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by'); // 'created_by' is the foreign key
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}