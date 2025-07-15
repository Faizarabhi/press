<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // ✅ Create Post (Reporter)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|string',
            'categorie_id' => 'required|exists:categories,id',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id();

        $post = Post::create($validated);

        return response()->json($post, 201);
    }

    // ✅ Update content/image (Reporter)
    public function updateContent(Request $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'image' => 'nullable|string',
            'content' => 'sometimes|string',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    // ✅ Update status + comment (Editor)
    public function updateStatus(Request $request, Post $post)
    {
        $validated = $request->validate([
            'status' => 'required|in:Draft,Pending,Approved,Rejected',
            'rejection_comment' => 'nullable|string',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    // ✅ Get validated posts with filters (Both roles)
    public function validated(Request $request)
    {
        $query = Post::where('status', 'Approved');

        if ($request->filled('author_id')) {
            $query->where('user_id', $request->author_id);
        }

        if ($request->filled('categorie_id')) {
            $query->where('categorie_id', $request->categorie_id);
        }

        if ($request->filled('from_date')) {
            $query->whereDate('published_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('published_at', '<=', $request->to_date);
        }

        return response()->json($query->with('author', 'category')->latest()->get());
    }

    public function index(Request $request)
{
    $user = auth()->user();

    $query = Post::query();

    // Restriction pour les reporters : ils ne voient que leurs propres posts
    if ($user->role === 'reporter') {
        $query->where('user_id', $user->id);
    }

    return response()->json(
        $query->with('author', 'category')->latest()->get()
    );
}

    public function show(Post $post)
{
    return response()->json($post->load('author', 'category'));
}

public function getPostsEditor(Request $request)
{
    $user = auth()->user();

    $query = Post::query();

    // Reporter → ne voir que ses propres articles
    if ($user->role === 'reporter') {
        $query->where('user_id', $user->id);
    }

    // 📌 Filtres dynamiques (accessibles aux deux rôles)
    if ($request->filled('author_id')) {
        $query->where('user_id', $request->author_id);
    }

    if ($request->filled('categorie_id')) {
        $query->where('categorie_id', $request->categorie_id);
    }

    if ($request->filled('from_date')) {
        $query->whereDate('published_at', '>=', $request->from_date);
    }

    if ($request->filled('to_date')) {
        $query->whereDate('published_at', '<=', $request->to_date);
    }

    // Relations + tri
    $posts = $query->with('author', 'category')->latest()->get();

    return response()->json($posts);
}

    public function destroy(Post $post)
{
    if (auth()->id() !== $post->user_id) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $post->delete(); // soft delete

    return response()->json(['message' => 'Post deleted successfully']);
}

}
