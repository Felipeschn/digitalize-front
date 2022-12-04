import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [currentUserId, setCurrentUserId] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token.slice(1, -1)}`
      setAuthenticated(true)
      setCurrentUserId(userId.slice(1, -1))
    }
  }, [])

  const handleLogin = async (login) => {
    const {
      data: { userId, token },
    } = await api.post('/authenticate-session', { ...login })
    localStorage.setItem('userId', JSON.stringify(userId))
    localStorage.setItem('token', JSON.stringify(token))

    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setAuthenticated(true)
    setCurrentUserId(userId)
    navigate('/')
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    api.defaults.headers.common.Authorization = undefined
    navigate('/login')
  }

  return { authenticated, currentUserId, handleLogin, handleLogout }
}

export default useAuth
