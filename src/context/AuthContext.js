import React, { createContext, useMemo } from 'react'
import useAuth from './Hooks/useAuth'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const { authenticated, currentUserId, handleLogin, handleLogout } = useAuth()
  const provider = useMemo(() => ({ authenticated, currentUserId, handleLogin, handleLogout }))

  return <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
}

export default AuthProvider
