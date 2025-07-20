import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { fetchAllPosts, fetchMyPosts } from '../../../store/posts/postsSlice'
import Article from '../../../components/Article'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function Posts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

const { filters } = useOutletContext()

  const { items: posts, loading, error } = useSelector((state) => state.posts)
  const { user } = useSelector((state) => state.auth)

 useEffect(() => {
  if (!user) return

  const query = {}

  if (filters?.categories?.length > 0) {
    query.categorie_id = filters.categories.join(',')
  }

  if (filters?.status?.length > 0) {
    query.status = filters.status.join(',')
  }

  if (user.role === 'editor') {
    dispatch(fetchAllPosts(query))
  } else if (user.role === 'reporter') {
    dispatch(fetchMyPosts(query))
  }
}, [dispatch, user, filters])

  if (loading) return <p className="text-gray-500">Chargement...</p>
  if (error) return <p className="text-red-500">{error?.message || 'Erreur serveur'}</p>
  if (!posts.length) {
    return (
      <div className="text-gray-500 ">
        {user.role !== 'editor' && (
            <div className='flex justify-end'>
        <button
          onClick={() => navigate('/dashboard/posts/create')}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          créer un article
        </button>
        </div>
        )}
        <div className='flex flex-col items-center justify-center mt-32'><p>Aucun article trouvé.</p></div>
        
      </div>
    )
  }

  return (
    <div>
      

      {user.role !== 'editor' && (
        <div className='flex justify-end'>
        <button
          onClick={() => navigate('/dashboard/posts/create')}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          créer un article
        </button>
        </div>
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
