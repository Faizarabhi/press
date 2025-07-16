export default function ArticleCard({ post }) {
  return (
    <div className="border p-4 rounded-md shadow-sm space-y-2">
      <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded" />
      <div>
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
        <div className="text-xs text-gray-500">
          {new Date(post.created_at).toLocaleDateString()} — {post.status} — {post.category.name}
        </div>
        <a href={`/dashboard/posts/${post.id}`} className="text-indigo-600 text-sm font-medium">
          Voir plus →
        </a>
      </div>
    </div>
  )
}
