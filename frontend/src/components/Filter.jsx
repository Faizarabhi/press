import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/category/categorySlice'
import { FunnelIcon } from '@heroicons/react/24/outline'

export default function Filter({ onChange }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { items: categories, loading, error } = useSelector(state => state.categories)

  const [categoryState, setCategoryState] = useState([])
  const [statusState, setStatusState] = useState([])

  // Status options based on role
  const statusOptions = user?.role === 'editor'
    ? ['approved', 'pending', 'rejected']
    : ['draft', 'pending']

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    setCategoryState(categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      checked: false
    })))
  }, [categories])

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleCategory = (id) => {
    const updated = categoryState.map(cat =>
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    )
    setCategoryState(updated)
    triggerChange(updated, statusState)
  }

  const toggleStatus = (status) => {
    const updated = statusState.includes(status)
      ? statusState.filter(s => s !== status)
      : [...statusState, status]
    setStatusState(updated)
    triggerChange(categoryState, updated)
  }

  const triggerChange = (cats, statusList) => {
    if (onChange) {
      onChange({
        categories: cats.filter(c => c.checked).map(c => c.id),
        status: statusList
      })
    }
  }

  if (loading) return <p>Chargement des catégories...</p>
  if (error) return <p className="text-red-500">Erreur : {error}</p>

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
      >
        Filter
        <FunnelIcon className="ml-2 h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-h-96 overflow-y-auto">
          {/* Categories */}
          <div className="border-b">
            <h6 className="px-4 py-2 text-sm font-semibold text-gray-900">Categories</h6>
            <ul className="p-3 space-y-2 text-sm text-gray-700">
              {categoryState.map(({ id, name, checked }) => (
                <li key={id} className="flex items-center">
                  <input
                    id={`cat-${id}`}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCategory(id)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label htmlFor={`cat-${id}`} className="ml-2">
                    {name}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h6 className="px-4 py-2 text-sm font-semibold text-gray-900">Status</h6>
            <ul className="p-3 space-y-2 text-sm text-gray-700">
              {statusOptions.map(status => (
                <li key={status} className="flex items-center">
                  <input
                    id={`status-${status}`}
                    type="checkbox"
                    checked={statusState.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="h-4 w-4 text-green-600"
                  />
                  <label htmlFor={`status-${status}`} className="ml-2 capitalize">
                    {status}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
