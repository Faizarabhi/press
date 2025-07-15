import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'



export default function Login() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
