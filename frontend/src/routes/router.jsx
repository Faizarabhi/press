import { createBrowserRouter, Navigate } from 'react-router-dom'
import Public from '../pages/Public'
import Login from '../pages/Login'
import Register from '../pages/Register'

function isAuthenticated() {
  return false 
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Public />,
  },
  {
    path: '/login',
    element: isAuthenticated() ? <Navigate to="/" /> : <Login />,
  },
  {
    path: '/register',
    element: isAuthenticated() ? <Navigate to="/" /> : <Register />,
  },
])

export default router
