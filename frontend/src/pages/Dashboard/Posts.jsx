import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../features/posts/postsSlice'
import Article from '../../components/Article'

export default function Posts() {
  const dispatch = useDispatch()
  const { items: posts, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  if (loading) return <p className="text-gray-500">Chargement...</p>

  if (error) {
    console.error(error)
    return (
      <p className="text-red-500">
        {typeof error === 'string'
          ? error
          : error?.message || 'Erreur serveur inconnue'}
      </p>
    )
  }

  if (!posts.length) return <p className="text-gray-500">Aucun article trouvé.</p>

  return (
    <div className="  px-4">
      <h1 className="text-2xl font-bold mb-4">Liste des articles</h1>
     <ul className="flex justify-center flex-wrap gap-4">
  {posts.map((post) => (
    <li key={post.id} className="w-1/3 max-w-42 min-h-[420px] ">
      <Article post={post} />
    </li>
  ))}
</ul>
    </div>
  )
}
