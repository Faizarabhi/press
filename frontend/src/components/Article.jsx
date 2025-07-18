import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'


export default function Article({ post,link }) {
  const backendUrl = process.env.REACT_APP_API_BASE_URL_St
  const { user } = useSelector((state) => state.auth)

  
  return (
   <article className="flex flex-col justify-between h-full p-4 rounded-lg bg-white shadow">
  
  {post?.image && (
    <div className="w-full h-48">
      <img
        src={`${backendUrl}/storage/${post?.image}`} 
        alt={post?.title}
        className="w-full h-full rounded-md object-cover"
      />
    </div>
  )}

  <div className="mt-3 flex items-center gap-x-4 text-xs">
    <time dateTime={post?.created_at} className="text-gray-500">
      {new Date(post?.created_at).toLocaleDateString()}
    </time>
    <span className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
      {post?.category?.name}
    </span>
  </div>

  <div className="mt-3 flex flex-col grow">
    <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-600">
       <Link to={link}>
        {post?.title}
      </Link>
    </h3>
    <p className="mt-3 text-sm text-gray-600">
      {post?.content.length > 50
        ? post.content.substring(0, 50) + '...'
        : post.content}
    </p>
  </div>

  <div className="mt-6 flex items-center justify-between gap-4 text-sm">
    {/* Auteur */}
    {user?.role === 'editor' && (
      <div className="flex items-center gap-x-2">
        <img
          alt=""
          src={
            post?.author?.imageUrl ||
            "https://ui-avatars.com/api/?name=" + encodeURIComponent(post?.author?.name)
          }
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-gray-900 font-medium">{post?.author?.name}</span>
      </div>
    )}

    <div className="flex flex-col items-end text-right">
      <span className="text-gray-500 mb-1">{post?.status}</span>
      <Link
        to={link}
        className="text-indigo-600 hover:underline text-sm"
      >
        Voir les détails →
      </Link> 
    </div>
  </div>
</article>

  );
}
