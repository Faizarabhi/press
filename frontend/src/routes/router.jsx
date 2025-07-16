import { createBrowserRouter, Navigate } from 'react-router-dom'
import Public from '../pages/Public'
import Login from '../pages/Login'
import Register from '../pages/Register'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import Posts from '../pages/Dashboard/Posts'
import PostReview from '../pages/Dashboard/PostReview'
import PostEdit from '../pages/Dashboard/PostEdit'
import NotFound from '../pages/NotFound'

function isAuthenticated() {
  return !!localStorage.getItem('token')
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Public />,
  },
  {
    path: '/login',
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Login />,
  },
  {
    path: '/register',
    element: isAuthenticated() ? <Navigate to="/" replace /> : <Register />,
  },
  {
    path: '/dashboard',
    element: isAuthenticated() ? <DashboardLayout /> : <Navigate to="/login" replace />,
    children: [
      {
        path: 'posts',
        element: <Posts />,
      },
      {
        path: 'posts/:id',
        element: <PostReview />,
      },{
        path: '/dashboard/posts/:id/edit',
        element: <PostEdit />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
