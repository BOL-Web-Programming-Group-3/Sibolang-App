<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostAdminController extends Controller
{
    /**
     * Display a listing of the posts.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch posts from the database
        $posts = Post::with('user')->where('type', 'post')->latest()->get();

        // Pass posts to the 'AdminPost' view
        return Inertia::render('AdminPost', [
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
            'image' => $imagePath, // Store the image path in the database
            'created_by' => Auth::id(), // Set the user ID as created_by
        ]);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified post.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // Query comments directly with a where clause for the post_id
        $comments = Comment::where('post_id', $post->id)
            ->with('user') // Load the user who created the comment
            ->oldest() // Order by the latest comments
            ->get();

        // Return the post and its comments to the Inertia view
        return Inertia::render('AdminPostDetail', [
            'post' => $post->load('user'), // Load the user who created the post
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

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
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

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }

    /**
     * Update the status of a post to published or rejected.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'id' => 'required|exists:posts,id', // Ensure the post exists
            'status' => 'required|in:published,rejected', // Only allow specific statuses
        ]);

        // Find the post and update the status
        $post = Post::findOrFail($validated['id']);
        $post->update([
            'status' => $validated['status'],
        ]);

        return redirect()->route('admin.posts.index')->with('success');
    }
}
