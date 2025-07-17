import { Link } from "react-router-dom";

export default function Article({ post,link }) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between border p-4 rounded-lg" >
      {post.image && (
        <img
        //  src='{post.image}'
          src='https://industricomgroup.com/wp-content/uploads/2023/12/mggg.png'
          alt={post.title}
          className="w-full h-48 rounded-md object-cover"
        />
      )}

      <div className="flex items-center gap-x-4 text-xs mt-3">
        <time dateTime={post.created_at} className="text-gray-500">
          {new Date(post.created_at).toLocaleDateString()}
        </time>
        <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
          {post.category.name}
        </span>
      </div>

      <div className="group relative grow mt-3">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className="absolute inset-0" />
            {post.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm text-gray-600">{post.content}</p>
      </div>

      <div className="relative mt-8 flex items-center gap-x-4 justify-between min-w-full">
        
        <div className="flex items-center gap-x-4"><img
          alt=""
          src={
            post.author.imageUrl ||
            "https://ui-avatars.com/api/?name=" + encodeURIComponent(post.author.name)
          }
          className="h-10 w-10 rounded-full bg-gray-50 object-cover"
        />
        <div className="text-sm">
          <p className="font-semibold text-gray-900">{post.author.name}</p>
          </div>
        </div>
        <p className="text-gray-500">{post.status}</p>
            <Link
              to={ link}
              className="text-indigo-600 hover:underline mt-2 inline-block"
            >
              Voir les détails →
            </Link>
      </div>
    </article>
  );
}
