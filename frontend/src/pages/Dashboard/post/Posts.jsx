import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { fetchAllPosts, fetchMyPosts } from '../../../store/posts/postsSlice'
import Article from '../../../components/Article'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Posts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { categoryFilter } = useOutletContext() // 👈 access filter
  const { items: posts, loading, error } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) return

    // Prepare filter object
    const filters = {}
    if (categoryFilter?.length > 0) {
      filters.categorie_id = categoryFilter.join(',') // assuming your backend can handle multiple
    }

    if (user.role === 'editor') {
      dispatch(fetchAllPosts(filters))
    } else if (user.role === 'reporter') {
      dispatch(fetchMyPosts(filters)) // optional: extend fetchMyPosts to accept filters
    }
  }, [dispatch, user, categoryFilter])

  if (loading) return <p className="text-gray-500">Chargement...</p>
  if (error) return <p className="text-red-500">{error?.message || 'Erreur serveur'}</p>
  if (!posts.length) {
    return (
      <div className="text-gray-500">
        {user.role !== 'editor' && (
          <button
            onClick={() => navigate('/dashboard/posts/create')}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Enregistrer
          </button>
        )}
        <p>Aucun article trouvé.</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>

      {user.role !== 'editor' && (
        <button
          onClick={() => navigate('/dashboard/posts/create')}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Enregistrer
        </button>
      )}

      <ul className="flex justify-center flex-wrap gap-4">
        {posts?.map((post) => (
          <li key={post.id} className="w-64 h-auto overflow-hidden rounded-xl shadow bg-white">
            <Article post={post} link={`/dashboard/posts/${post.id}`} />
          </li>
        ))}
      </ul>
    </div>
  )
}
