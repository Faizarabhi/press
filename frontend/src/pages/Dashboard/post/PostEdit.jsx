import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchPostById, deletePost } from '../../../store/posts/postsSlice'
import { CheckIcon } from '@heroicons/react/24/outline'
import TextArea from '../../../components/TextArea'
import Select from '../../../components/Select'
import ImageUploader from '../../../components/ImageUploader'
import PostComment from '../../../components/PostComment'

export default function ReviewPost() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selected: post, loading, error } = useSelector((state) => state.posts)

  const [status, setStatus] = useState('')
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (id) dispatch(fetchPostById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      setStatus(post.status)
      setTitle(post.title)
      setContent(post.content)
      setImage(post.image)
    }
  }, [post])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // TODO: call API or dispatch redux update here
    console.log('Saving...', { title, content, status, image })
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error.message || 'Erreur'}</p>
  if (!post) return <p>Aucun article trouvé</p>

  const statusOptions = [
    { value: '', label: 'Select status', disabled: true },
    { value: 'draft', label: 'Draft' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <span className="text-sm text-gray-500">
            Par <strong>{post.author.name}</strong> •{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            label="Status"
            id="status"
            options={statusOptions}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          
          <button
            onClick={handleSave}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <CheckIcon className="w-5 h-5" />
            Enregistrer
          </button>
          
        </div>
        
      </div>
      <span className="text-sm">{status === 'rejected' ? <PostComment content={post.comment} /> : ''}</span>

      <ImageUploader image={image} onChange={handleFileChange} />

      <div className="p-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 text-gray-700 rounded-md px-3 py-2 mb-4"
        />
        <TextArea content={content} onChange={(e) => setContent(e.target.value)} />
      </div>
    </div>
  )
}
