import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  fetchPostById,
  updatePostContent,
  updatePostStatus,
} from '../../../store/posts/postsSlice'
import { CheckIcon } from '@heroicons/react/24/outline'
import TextArea from '../../../components/TextArea'
import Select from '../../../components/Select'
import ImageUploader from '../../../components/ImageUploader'
import PostComment from '../../../components/PostComment'
import { MessageRejected } from '../../../components/MessageRejected'
import Alert from '../../../components/Alert'
import { fetchCategories } from '../../../store/category/categorySlice'

export default function ReviewPost() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { selected: post, loading, error } = useSelector((state) => state.posts)
  const { items: categories } = useSelector((state) => state.categories)
  const { user } = useSelector((state) => state.auth)

  const backendUrl = process.env.REACT_APP_API_BASE_URL_St

  const [status, setStatus] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [categorie_id, setCategorieId] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [rejectionComment, setRejectionComment] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    if (id) dispatch(fetchPostById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (post) {
      setStatus(post.status || '')
      setTitle(post.title || '')
      setContent(post.content || '')
      setRejectionComment(post.rejection_comment || '')
      setCategorieId(post.category?.id?.toString() || '')
      setImage(null)

      setPreview(post.image ? `${backendUrl}/storage/${post.image}` : '')
    }
  }, [post])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    try {
      const formDataImage = preview === '' && image === null ? null : image ?? undefined

      if (user.role === 'reporter') {
        await dispatch(
          updatePostContent({
            id,
            data: {
              title,
              content,
              status,
              image: formDataImage,
              categorie_id,
            },
          })
        ).unwrap()
      }

      if (user.role === 'editor') {
        await dispatch(
          updatePostStatus({
            id,
            data: { status, rejection_comment: rejectionComment },
          })
        ).unwrap()
      }

      await dispatch(fetchPostById(post.id))
      setSuccessMsg('Modifications enregistrées avec succès !')
    } catch (err) {
      console.error(err)
      setErrorMsg('Une erreur est survenue lors de la sauvegarde.')
    }
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error.message || 'Erreur'}</p>
  if (!post) return <p>Aucun article trouvé</p>

  const allStatuses = [
    { value: 'Draft', label: 'Brouillon' },
    { value: 'Pending', label: 'En attente' },
    { value: 'Approved', label: 'Approuvé' },
    { value: 'Rejected', label: 'Rejeté' },
  ]

  const statusOptions = [
    { value: '', label: 'Select status', disabled: true },
    ...(user.role === 'reporter'
      ? allStatuses.filter((s) => s.value === 'Draft' || s.value === 'Pending')
      : allStatuses.filter((s) => s.value !== 'Draft')),
  ]

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <span className="text-sm text-gray-500">
            Par <strong>{post?.author?.name}</strong> •{' '}
            {new Date(post?.created_at).toLocaleDateString()}
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
          >
            <CheckIcon className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </div>

      {post?.rejection_comment && (
        <MessageRejected title={post.rejection_comment} />
      )}

      {status === 'Rejected' && user.role === 'editor' && (
        <PostComment
          content={rejectionComment}
          onChange={(e) => setRejectionComment(e.target.value)}
        />
      )}

      {user.role === 'reporter' ? (
        <>
          <div className="p-6">
            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">
                Catégorie
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={categorie_id}
                onChange={(e) => setCategorieId(e.target.value)}
                required
              >
                <option value="">-- Sélectionner une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 text-gray-700 rounded-md px-3 py-2 mb-4"
            />
            <TextArea
              content={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="relative group w-full h-64 mt-4">
              {preview && (
                <img
                  src={preview}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ImageUploader
                  image={preview}
                  edit={true}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={`${backendUrl}/storage/${post?.image}`}
            alt={post?.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <span className="inline-block bg-gray-100 text-sm font-medium text-gray-600 px-3 py-1 rounded-full mb-4">
              {post?.category?.name}
            </span>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post?.content}
            </p>
          </div>
        </>
      )}

      {successMsg && <Alert status="success" content={successMsg} />}
      {errorMsg && <Alert status="error" content={errorMsg} />}
    </div>
  )
}
