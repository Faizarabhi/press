import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchValidatedPostPublicById } from '../store/posts/postsSlice'
import { CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ReviewPost() {
  const backendUrl = process.env.REACT_APP_API_BASE_URL_St
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selected: post, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (id) dispatch(fetchValidatedPostPublicById(id))
  }, [id, dispatch])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-96 bg-gray-300 rounded" />
        <div className="h-8 bg-gray-200 rounded w-2/4 mt-6" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error.message || 'Erreur lors du chargement de l’article.'}</p>
  }

  if (!post) {
    return <p className="text-center text-gray-500 mt-10">Aucun article trouvé.</p>
  }

  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto  bg-white shadow-md rounded-xl relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        
      <div className="p-6 border-b border-gray-100 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <UserIcon className="w-5 h-5 text-gray-400" />
          <span className="font-medium">{post.author?.name}</span>
          <CalendarDaysIcon className="w-5 h-5 text-gray-400 ml-4" />
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        {post.category?.name && (
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
            {post.category.name}
          </span>
        )}
      </div>

      {post.image && (
        <div className="w-full h-[28rem] overflow-hidden">
          <img
            src={`${backendUrl}/storage/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {post.content}
        </p>
      </div>
    </div>
    <Footer/>
    </>
  )
}
