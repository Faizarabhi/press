
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../../store/posts/postsSlice'
import { fetchCategories } from '../../../store/category/categorySlice'
import ImageUploader from '../../../components/ImageUploader'
import { useNavigate } from 'react-router-dom'

const PostCreate = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.posts)
  const { items: categories, loading: loadingCategories } = useSelector((state) => state.categories)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [categorie_id, setCategorieId] = useState('')
  const [status, setStatus] = useState('draft')

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Create preview URL for the selected image
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(image)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  const handleRemove = () => {
    setImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('categorie_id', categorie_id)
    formData.append('status', status)
    if (image) formData.append('image', image)

    try {
      await dispatch(createPost(formData)).unwrap()
      // Reset form fields on success
      setTitle('')
      setContent('')
      setImage(null)
      setCategorieId('')
      setStatus('draft')
      alert('Article créé avec succès')
      navigate('/dashboard/posts')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Créer un article</h2>

      <div>
        <label className="block font-medium mb-1">Titre</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Catégorie</label>
        {loadingCategories ? (
          <p>Chargement des catégories...</p>
        ) : (
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
        )}
      </div>

      <div>
        {previewUrl ? (
          <div className="relative inline-block object-cover">
            <img src={previewUrl} alt="Preview" className="rounded border  transition-transform duration-300 hover:scale-105" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ) : (
          <ImageUploader
            image={previewUrl}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }}
          />
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Contenu</label>
        <textarea
          className="w-full border px-3 py-2 rounded "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

    <label className="flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={status === 'pending'}
    onChange={() => setStatus(status === 'pending' ? 'draft' : 'pending')}
  />
  
  <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-orange-600 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:peer-checked:bg-orange-600"></div>

  <span
    className={`ms-3 text-sm font-medium ${
      status === 'pending'
        ? 'text-orange-600'
        : 'text-gray-400 dark:text-gray-500'
    }`}
  >
    {status === 'pending' ? 'En attente' : 'Brouillon'}
  </span>
</label>



         
    

      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 mb-4 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Création en cours...' : 'Créer'}
      </button>

      {error && <p className="text-red-600">{error}</p>}
    </form>
  )
}

export default PostCreate