<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ForumController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch posts with user and comment count
        $posts = Post::with('user')
            ->withCount('comments') // Count the related comments for each post
            ->withCount([
                'votes as upvotes_count' => function ($query) {
                    $query->where('vote_type', 'up');
                },
                'votes as downvotes_count' => function ($query) {
                    $query->where('vote_type', 'down');
                },
            ])
            ->where('status', 'published')
            ->where('type', 'forum')
            ->latest()
            ->get()->map(function ($post) {
            // Check if the logged-in user has voted on the post
            $userVote = $post->votes->where('user_id', Auth::id())->first();
            $post->user_vote = $userVote ? $userVote->vote_type : null; // 'up', 'down', or null if no vote

            return $post;
        });

        // Pass posts to the 'Post' view
        return Inertia::render('Forum', [
            'posts' => $posts,
        ]);
    }

    /**
     * Store a newly created post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Optional image field
        ]);

        // Handle image upload if present
        $imagePath = null;
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = $request->file('image')->store('images', 'public'); // Store the image in the 'images' folder in public disk
        }

        // Create a new post
        Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'status' => 'pending', // Default status
            'type' => 'forum', // Use the enum for the type
            'image' => $imagePath, // Store the image path in the database
            'created_by' => Auth::id(), // Set the user ID as created_by
        ]);

        return redirect()->route('user.forums.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified post.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $forum)
    {
        // Fetch comments for the post with user info, ordered by the oldest
        $comments = Comment::where('post_id', $forum->id)
            ->with('user') // Load the user who created the comment
            ->oldest() // Order by the oldest comments
            ->get();

        // Eager load the 'user' relation along with the counts for upvotes and downvotes
        $forum->load('user'); // Ensure user is loaded
        $forum->loadCount([
            'votes as upvotes_count' => function ($query) {
                $query->where('vote_type', 'up');
            },
            'votes as downvotes_count' => function ($query) {
                $query->where('vote_type', 'down');
            },
        ]);

        // Check if the logged-in user has voted on the post and store their vote status
        $userVote = $forum->votes->where('user_id', Auth::id())->first();
        $forum->user_vote = $userVote ? $userVote->vote_type : null; // 'up', 'down', or null if no vote

        // Return the forum post, its comments, and vote data to the Inertia view
        return Inertia::render('ForumDetail', [
            'post' => $forum, // The forum post with user, vote counts, and user vote status
            'comments' => $comments, // The list of comments for the post
        ]);
    }

    /**
     * Show the form for editing the specified post.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return view('user.posts.edit', compact('post'));
    }

    /**
     * Update the specified post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Optional image field
        ]);

        // Handle image upload if present
        $imagePath = $post->image;
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Delete the old image from the storage if it exists
            if ($post->image) {
                \Storage::delete('public/' . $post->image);
            }
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Update the post
        $post->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'status' => 'pending', // Default status
            'image' => $imagePath,
        ]);

        return redirect()->route('user.forums.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified post from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // Delete the image if it exists
        if ($post->image) {
            \Storage::delete('public/' . $post->image);
        }

        // Delete the post
        $post->delete();

        return redirect()->route('user.forums.index')->with('success', 'Post deleted successfully.');
    }
}
