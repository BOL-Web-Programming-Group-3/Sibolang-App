<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ForumAdminController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch posts from the database
        $posts = Post::with('user')->where('type', 'forum')->latest()->get();

        // Pass posts to the 'AdminPost' view
        return Inertia::render('AdminForum', [
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
        ]);

        // Create a new post
        Post::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'status' => 'pending', // Default status
            'type' => 'forum', // Use the enum for the type
            'created_by' => Auth::id(), // Set the user ID as created_by
        ]);

        return redirect()->route('admin.forums.index')->with('success');
    }

    /**
     * Display the specified post.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $forum)
    {
        // Query comments directly with a where clause for the post_id
        $comments = Comment::where('post_id', $forum->id)
            ->with('user') // Load the user who created the comment
            ->oldest() // Order by the latest comments
            ->get();

        // Return the post and its comments to the Inertia view
        return Inertia::render('AdminForumDetail', [
            'post' => $forum->load('user'), // Load the user who created the post
            'comments' => $comments, // Pass the filtered comments
        ]);
    }

    /**
     * Update the specified post in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $forum)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        // Update the post
        $forum->update([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'status' => 'pending', // Default status
        ]);

        return redirect()->route('admin.forums.index')->with('success');
    }

    /**
     * Remove the specified post from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $forum)
    {
        // Delete the image if it exists
        if ($forum->image) {
            \Storage::delete('public/' . $forum->image);
        }

        // Delete the post
        $forum->delete();

        return redirect()->route('admin.forums.index')->with('success');
    }
}
