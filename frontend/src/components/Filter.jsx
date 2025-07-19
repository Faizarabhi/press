import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/category/categorySlice' // corrige selon ton chemin exact

export default function Filter({ onChange }) {
  const dispatch = useDispatch()

  const { items: categories, loading, error } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const catsForFilter = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    checked: false
  }))


  const [selected, setSelected] = useState(catsForFilter)

  useEffect(() => {
    setSelected(catsForFilter)
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

  // Toggle checkbox
  const toggleCheckbox = (id) => {
    const updated = selected.map(cat =>
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    )
    setSelected(updated)
    if (onChange) {
      onChange(updated.filter(c => c.checked).map(c => c.id))
    }
  }

  if (loading) return <p>Chargement des catégories...</p>
  if (error) return <p className="text-red-500">Erreur : {error}</p>

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Filter by category
        <svg
          className="ml-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-64 overflow-y-auto">
          <h6 className="px-4 py-2 text-sm font-semibold text-gray-900 border-b">Category</h6>
          <ul className="p-3 space-y-2 text-sm text-gray-700 max-h-48 overflow-y-auto">
            {selected.map(({ id, name, checked }) => (
              <li key={id} className="flex items-center">
                <input
                  id={`cat-${id}`}
                  type="checkbox"
                  checked={checked || false}
                  onChange={() => toggleCheckbox(id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                 <label htmlFor={`cat-${id}`} className="ml-2 block cursor-pointer select-none">
                  {name} 
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
