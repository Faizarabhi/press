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
        $validated = $request->validate([
            'categorie_id' => 'sometimes|exists:categories,id',
            'from_date' => 'sometimes|date',
            'to_date' => 'sometimes|date|after_or_equal:from_date',
        ]);

        $query = Post::query()
            ->where('status', 'Approved')
            ->when(
                isset($validated['categorie_id']),
                fn($q) =>
                $q->where('categorie_id', $validated['categorie_id'])
            )
            ->when(
                isset($validated['from_date']),
                fn($q) =>
                $q->whereDate('published_at', '>=', $validated['from_date'])
            )
            ->when(
                isset($validated['to_date']),
                fn($q) =>
                $q->whereDate('published_at', '<=', $validated['to_date'])
            );

        $posts = $query->with(['author', 'category'])
            ->orderByDesc('published_at')
            ->get();

        return response()->json($posts);
    }
    public function validatedPost($id)
    {
        $post = Post::where('id', $id)
            ->where('status', 'Approved')
            ->with(['author', 'category'])
            ->first();

        if (!$post) {
            return response()->json(['message' => 'Article non trouvé ou non approuvé.'], 404);
        }

        return response()->json($post);
    }
public function updateContent(Request $request, Post $post)
{
    try {
        // Authentification du propriétaire
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Not authorized.'], 403);
        }

        // Validation de base, sans l'image
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'status' => 'sometimes|in:Draft,Pending,Approved,Rejected',
            'categorie_id' => 'sometimes|exists:categories,id',
        ]);

        // Gérer le champ image
        if ($request->hasFile('image')) {
            // Valider et stocker le fichier
            $request->validate([
                'image' => 'file|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($post->image) {
                \Storage::disk('public')->delete($post->image);
            }

            $validated['image'] = $request->file('image')->store('images', 'public');

        } elseif ($request->input('image') === 'null') {
            // Demande explicite de suppression de l'image
            if ($post->image) {
                \Storage::disk('public')->delete($post->image);
            }
            $validated['image'] = null;
        }

        // Mise à jour
        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully',
            'post' => $post->fresh()
        ], 200);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error updating post',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function index(Request $request)
    {
        try {
            $user = auth()->user();
            $query = Post::query();

            if ($user->role === 'reporter') {
                // Reporter : uniquement ses propres posts (tous les statuts)
                $query->where('user_id', $user->id);
            }

            if ($user->role === 'editor') {
                // Editor : tous les posts sauf ceux en draft
                $query->where('status', '!=', 'draft');
            }

            // Filtres communs (peu importe le rôle)
            if ($request->filled('author_id')) {
                $query->where('user_id', $request->author_id);
            }

            if ($request->filled('categorie_id')) {
                $query->where('categorie_id', $request->categorie_id);
            }

            // Filtrage de statut en plus (si demandé explicitement)
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            return response()->json(
                $query->with('author', 'category')->latest()->get()
            );
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }




    public function show($id)
    {
        $post = Post::with('category')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Article non trouvé.'], 404);
        }

        return response()->json($post);
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

        $posts = $query->with('author', 'category')->latest()->get();

        return response()->json($posts);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        if (auth()->id() !== $post->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }


}
