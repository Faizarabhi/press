import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { login } from '../store/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
    
  }

  useEffect(() => {
    if (token) {
      navigate('/dashboard/posts')
    }
  }, [token, navigate])

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      {error && <p className="text-red-500">{error.message || 'Erreur de connexion'}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">
          Se connecter
        </button>
      </form>
    </div>
  )
}
