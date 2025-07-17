import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute({ children, requiredRole }) {
  const token = useSelector(state => state.auth.token)
  const userRole = useSelector(state => state.auth.user?.role)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
