import { createBrowserRouter, Navigate } from 'react-router-dom'
import Public from '../pages/Public'
import Login from '../pages/Login'
import Register from '../pages/Register'
import DashboardLayout from '../pages/Dashboard/DashboardLayout'
import Posts from '../pages/Dashboard/post/Posts.jsx'
import PostReview from '../pages/Dashboard/post/PostReview.jsx'
import PostEdit from '../pages/Dashboard/post/PostEdit.jsx'
import NotFound from '../pages/NotFound'
import ReadPost from '../pages/ReadPost'
import { ProtectedRoute } from '../routes/ProtectedRoute.js'
import PostCreate from '../pages/Dashboard/post/PostCreate.jsx'
import CategoryManage from '../pages/Dashboard/categories/CategoryManage.jsx'

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
        path: 'categories',
        element: (
          <ProtectedRoute>
            <CategoryManage />
          </ProtectedRoute>
        ),
      },
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
