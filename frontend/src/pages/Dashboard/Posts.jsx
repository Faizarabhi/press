import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllPosts, fetchMyPosts } from '../../store/posts/postsSlice'
import Article from '../../components/Article'

export default function Posts() {
  const dispatch = useDispatch()
  const { items: posts, loading, error } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) return

    if (user.role === 'editor') {
      dispatch(fetchAllPosts())
    } else if (user.role === 'reporter') {
      dispatch(fetchMyPosts())
    }
  }, [dispatch, user])

  if (loading) return <p className="text-gray-500">Chargement...</p>
  if (error) return <p className="text-red-500">{error?.message || 'Erreur serveur'}</p>
  if (!posts.length) return <p className="text-gray-500">Aucun article trouvé.</p>

  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
      <ul className="flex justify-center flex-wrap gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 min-h-[420px]"
          >
            <Article post={post} link={`/dashboard/posts/${post.id}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}
