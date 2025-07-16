import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchPostById, deletePost } from '../../features/posts/postsSlice'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function ReviewPost() {

   const { id } = useParams()
  const dispatch = useDispatch()
  const { selected: post, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (id) dispatch(fetchPostById(id))
        console.log("Post sélectionné :", post)
  }, [id])
const navigate = useNavigate()

const onEdit = () => {
  navigate(`/dashboard/posts/${id}/edit`)
}

const onDelete = async () => {
  if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
    try {
      await dispatch(deletePost(id)).unwrap()
      navigate('/dashboard/posts') // retour à la liste après suppression
    } catch (err) {
      alert("Erreur lors de la suppression : " + (err?.message || ''))
    }
  }
}
  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error.message || 'Erreur'}</p>
  if (!post) return <p>Aucun article trouvé</p>
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header avec actions */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <span className="text-sm text-gray-500">
            Par <strong>{post.author.name}</strong> •{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        {/* add if reporter */}
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-800"
            title="Modifier"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Image principale */}
      {post.image && (
        <img
          src={post.image}
          alt="cover"
          className="w-full h-64 object-cover"
        />
      )}

      {/* Contenu */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <span className="inline-block bg-gray-100 text-sm font-medium text-gray-600 px-3 py-1 rounded-full mb-4">
          {post.category.name}
        </span>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
  )
}
