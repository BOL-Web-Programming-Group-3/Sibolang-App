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
        return Inertia::render('AdminForumDetail', [
            'post' => $forum, // The forum post with user, vote counts, and user vote status
            'comments' => $comments, // The list of comments for the post
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

        return redirect()->route('admin.forums.index')->with('success');
    }
}
