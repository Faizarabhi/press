import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById } from '../store/posts/postsSlice'
import Header from '../components/Header'

export default function ReadPost() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const backendUrl = process.env.REACT_APP_API_BASE_URL_St
    const { selected: post, loading, error } = useSelector((state) => state.posts)

    useEffect(() => {
        if (id) dispatch(fetchPostById(id))
    }, [id, dispatch])

    if (loading) return <p>Chargement...</p>
    if (error) return <p className="text-red-600">{error}</p>
    if (!post) return <p>Aucun article trouvé</p>

    return (
        <div>
            <Header/>
        <div className="max-w-3xl mx-auto p-6 relative isolate overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <img src={`${backendUrl}/storage/${post.image}`} alt="post cover" className="mb-4 w-full h-[29rem] object-cover  rounded" />
            <p className="mb-4 text-gray-600">Par {post.author?.name} le {new Date(post.created_at).toLocaleDateString()}</p>

            <div className="whitespace-pre-line">{post.content}</div>
        </div></div>
    )
}
