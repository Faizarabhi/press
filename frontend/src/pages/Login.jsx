import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { login } from '../store/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className='flex min-h-screen'>
    <div className="flex-1 ">
    <div className=" flex flex-col items-center justify-center min-h-full ">
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
      </form>   <p className="mt-4 text-sm text-gray-600">
      Je n'ai pas de compte,&nbsp;
      <Link to="/register" className="text-orange-600 hover:underline">
        inscrivez-vous ici
      </Link>
      .
    </p>

    </div>
    </div>
    <div className='flex-1'>
    <img src="/images/austin-distel-PkS3hCZmYts-unsplash.jpg" className="className='w-full h-full object-cover'" alt="Login" />
    </div>
    </div>
  )
}
