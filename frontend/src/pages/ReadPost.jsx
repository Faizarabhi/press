import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById } from '../store/posts/postsSlice'

export default function ReadPost() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { selected: post, loading, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (id) dispatch(fetchPostById(id))
  }, [id, dispatch])

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!post) return <p>Aucun article trouvé</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="mb-4 text-gray-600">Par {post.author?.name} le {new Date(post.created_at).toLocaleDateString()}</p>
      <img src={post.image} alt="post cover" className="mb-4 w-full h-auto rounded" />
      <div className="whitespace-pre-line">{post.content}</div>
    </div>
  )
}
