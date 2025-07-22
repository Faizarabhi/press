import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { register } from '../store/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, error, loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'reporter' // valeur par défaut
  })
  const [localError, setLocalError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setLocalError(null) // reset erreur locale à chaque changement
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation mot de passe = confirmation
    if (formData.password !== formData.password_confirmation) {
      setLocalError('Les mots de passe ne correspondent pas.')
      return
    }
    dispatch(register(formData))
  }

  useEffect(() => {
    if (token) {
      navigate('/dashboard/posts') // redirige après inscription réussie
    }
  }, [token, navigate])

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center min-h-full px-4">
        <h1 className="text-2xl font-bold mb-4">Inscription</h1>

        {localError && (
          <p className="text-red-500 mb-4">{localError}</p>
        )}

        {error && (
          <p className="text-red-500 mb-4">
            {error.message || 'Erreur lors de l\'inscription'}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <input
            type="text"
            name="name"
            placeholder="Nom complet"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="reporter">Rapporteur</option>
            <option value="editor">Éditeur</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded disabled:opacity-50"
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          J'ai déjà un compte,&nbsp;
          <Link to="/login" className="text-orange-600 hover:underline">
            connectez-vous ici
          </Link>
          .
        </p>
      </div>
      <div className="flex-1 hidden md:block">
        <img
        src="/images/register.jpg"
          alt="Register"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
