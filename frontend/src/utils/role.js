export function hasRole(state, role) {
  return state.auth.user?.role === role
}

export function hasAnyRole(state, roles) {
  return roles.includes(state.auth.user?.role)
}
