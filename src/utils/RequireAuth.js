import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

function RequireAuth({ children }) {
  const navigate = useNavigate()
  const { authenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticated) {
      navigate('/login')
    }
  }, [])

  return children
}

export default RequireAuth
