import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchPostById, deletePost } from '../../../store/posts/postsSlice'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Dialog from '../../../components/Dialog'

export default function ReviewPost() {
  const backendUrl = process.env.REACT_APP_API_BASE_URL_St
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selected: post, loading, error } = useSelector((state) => state.posts)

  const { user } = useSelector((state) => state.auth)
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (id) dispatch(fetchPostById(id))
    console.log("Post sélectionné :", post)
  }, [id])
  const navigate = useNavigate()

  const onEdit = () => {
    navigate(`/dashboard/posts/${id}/edit`)
  }


const onDelete = () => {
  setShowDialog(true)
}

const handleConfirmDelete = async () => {
  try {
    await dispatch(deletePost(id)).unwrap()
    navigate('/dashboard/posts')
  } catch (err) {
    alert("Erreur lors de la suppression : " + (err?.message || ''))
  } finally {
    setShowDialog(false)
  }
}

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error.message || 'Erreur'}</p>
  if (!post) return <p>Aucun article trouvé</p>
  return (
    <div  >
      <Dialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleConfirmDelete}
  title="Supprimer l’article"
  message="Voulez-vous vraiment supprimer cet article ? Cette action est irréversible."
/>
      <div className="flex items-center justify-between p-4 border-b ">
        <div>
          <span className="text-sm text-gray-500">
            Par <strong>{post.author?.name}</strong> •{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-indigo-600 hover:text-indigo-800"
            title="Modifier"
          >
            <PencilSquareIcon className="h-5 w-5" />
          </button>
         {user.role === 'reporter' &&(<button
            onClick={onDelete}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <TrashIcon className="h-5 w-5" />
          </button>)}
        </div>
      </div>


     {post.image && (
  <div className="w-full h-[29rem] overflow-hidden rounded-md">
  <img
    src={`${backendUrl}/storage/${post.image}`} 
    alt={post.title}
    className="w-full h-full object-cover  transition-transform duration-300 hover:scale-105"
  />
</div>



    )}
    
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <span className="inline-block bg-gray-100 text-sm font-medium text-gray-600 px-3 py-1 rounded-full mb-4">
          {post?.category?.name}
        </span>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
    </div>
  )
}
