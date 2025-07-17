import { createBrowserRouter, Navigate } from 'react-router-dom'
import Public from '../pages/Public'
import Login from '../pages/Login'
import Register from '../pages/Register'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import Posts from '../pages/Dashboard/Posts'
import PostReview from '../pages/Dashboard/PostReview'
import PostEdit from '../pages/Dashboard/PostEdit'
import NotFound from '../pages/NotFound'
import ReadPost from '../pages/ReadPost'
import { ProtectedRoute } from '../routes/ProtectedRoute.js'
import PostCreate from '../pages/Dashboard/PostCreate.jsx'

const router = createBrowserRouter([
  {
    path: '/post',
    element: <ReadPost />,
  },
  {
    path: '/',
    element: <Public />,
  },
  {
    path: '/post-review/:id',
    element: <ReadPost />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'posts',
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/:id',
        element: (
          <ProtectedRoute>
            <PostReview />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <ProtectedRoute >
            {/* requiredRole="editor"  */}
            <PostEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts/create',
        element: (
          <ProtectedRoute >
            <PostCreate />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
