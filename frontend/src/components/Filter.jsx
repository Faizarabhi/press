import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../store/category/categorySlice'
import { fetchAuthors } from '../store/user/userSlice'
import { AdjustmentsVerticalIcon, FunnelIcon } from '@heroicons/react/24/outline'

export default function Filter({ onChange }) {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { items: categories, loading: loadingCategories, error } = useSelector(state => state.categories)
    const { authors, loading: loadingAuthors } = useSelector(state => state.users)

    const [categoryState, setCategoryState] = useState([])
    const [statusState, setStatusState] = useState([])
    const [selectedAuthor, setSelectedAuthor] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef()

    const statusOptions = user?.role === 'editor'
        ? ['approved', 'pending', 'rejected']
        : ['draft', 'pending']

    useEffect(() => {
        dispatch(fetchCategories());
        if (user.role === 'editor') {
            dispatch(fetchAuthors());
        }
    }, [dispatch, user.role]);
    useEffect(() => {
        setCategoryState(categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            checked: false
        })))
    }, [categories])

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
        triggerChange(updated, statusState, selectedAuthor, startDate, endDate)
    }

    const toggleStatus = (status) => {
        const updated = statusState.includes(status)
            ? statusState.filter(s => s !== status)
            : [...statusState, status]
        setStatusState(updated)
        triggerChange(categoryState, updated, selectedAuthor, startDate, endDate)
    }

    const handleAuthorChange = (e) => {
        const val = e.target.value
        setSelectedAuthor(val)
        triggerChange(categoryState, statusState, val, startDate, endDate)
    }

    const handleDateChange = (type, val) => {
        if (type === 'start') setStartDate(val)
        else setEndDate(val)
        triggerChange(categoryState, statusState, selectedAuthor, type === 'start' ? val : startDate, type === 'end' ? val : endDate)
    }

    const triggerChange = (categories, statusList, authorId, start, end) => {
        if (onChange) {
            onChange({
                categorie_id: categories.filter(c => c.checked).map(c => c.id),
                status: statusList,
                author_id: user?.role === 'editor' && authorId ? [authorId] : [],
                start_date: start,
                end_date: end
            });
        }
    };


    if (loadingCategories || loadingAuthors) return <p>Chargement...</p>
    if (error) return <p className="text-red-500">Erreur : {error}</p>

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex justify-center items-center rounded-md border  px-4 py-2 text-sm font-medium text-gray-400 hover hover:bg-gray-500"
            >
                Filter
                <AdjustmentsVerticalIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>

            {open && (
                <div className="absolute  mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 max-h-[32rem] overflow-y-auto p-4 space-y-4">

                    {/* Authors - Only for editors */}
                    {user?.role === 'editor' && (
                        <div>
                            <label className="text-sm font-semibold text-gray-900">Author</label>
                            <select
                                value={selectedAuthor}
                                onChange={handleAuthorChange}
                                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                            >
                                <option value="">All</option>
                                {authors.map(author => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}


                    {/* Dates */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Date Range</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => handleDateChange('start', e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => handleDateChange('end', e.target.value)}
                            className="w-full border rounded px-2 py-1 text-sm"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <h6 className="text-sm font-semibold text-gray-900">Categories</h6>
                        <ul className="p-1 space-y-2 text-sm text-gray-700 max-h-32 overflow-y-auto">
                            {categoryState.map(({ id, name, checked }) => (
                                <li key={id} className="flex items-center">
                                    <input
                                        id={`cat-${id}`}
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleCategory(id)}
                                        className="h-4 w-4 text-gray-600"
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
                        <h6 className="text-sm font-semibold text-gray-900">Status</h6>
                        <ul className="p-1 space-y-2 text-sm text-gray-700">
                            {statusOptions.map(status => (
                                <li key={status} className="flex items-center">
                                    <input
                                        id={`status-${status}`}
                                        type="checkbox"
                                        checked={statusState.includes(status)}
                                        onChange={() => toggleStatus(status)}
                                        className="h-4 w-4 text-orange-600"
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
