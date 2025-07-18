import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from '../../../store/category/categorySlice'

const CategoriesManage = () => {
  const dispatch = useDispatch()
  const { items: categories, loading, error } = useSelector(state => state.categories)
  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleCreate = (e) => {
    e.preventDefault()
    if (name.trim() === '') return
    dispatch(createCategory({ name }))
    setName('')
  }

  const handleDelete = (id) => {
    if (window.confirm('Supprimer cette catégorie ?')) {
      dispatch(deleteCategory(id))
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Catégories</h1>

      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={name}
          placeholder="Nom de la catégorie"
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </form>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoriesManage
