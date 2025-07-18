<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // ✅ Create Post (Reporter)
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'categorie_id' => 'required|exists:categories,id',
                'content' => 'required|string',
            ]);
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('images', 'public');
                $validated['image'] = $path;
            }
            $validated['user_id'] = auth()->id();

            $post = Post::create($validated);

            return response()->json($post, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

   public function updateContent(Request $request, Post $post)
{
    try {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Not authorized.'], 403);
        }

        if ($request->has('image')) {
            $image = $request->input('image');
            if ($image === 'undefined' || $image === '' || $image === null) {
                $request->request->remove('image');
            }
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'sometimes|in:Draft,Pending,Approved,Rejected',
            'categorie_id' => 'sometimes|exists:categories,id',
            'content' => 'sometimes|required|string',
        ]);

        if ($request->hasFile('image')) {
            if ($post->image) {
                \Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        $post->update($validated);

        return response()->json(['message' => 'Post updated', 'post' => $post->fresh()]);

    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
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
        try {
            $user = auth()->user();
            $query = Post::query();

            if ($user->role === 'reporter') {
                $query->where('user_id', $user->id);
                $query->where('user_id', $request->author_id);
            }


            if ($request->filled('categorie_id')) {
                $query->where('categorie_id', $request->categorie_id);
            }

              if ($request->filled('status')) {
                 $query->where('status', $request->status);
             }

            /* if ($request->filled('from_date')) {
                 $query->whereDate('created_at', '>=', $request->from_date);
             }

             if ($request->filled('to_date')) {
                 $query->whereDate('created_at', '<=', $request->to_date);
             } */

            return response()->json(
                $query->with('author', 'category')->latest()->get()
            );
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


   public function show(Post $post)
{
    if ($post->status !== 'Draft') {
        return response()->json(['message' => 'Post non disponible'], 403);
    }

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
