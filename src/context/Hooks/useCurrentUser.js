import { useState, useContext } from 'react'
import api from '../../api'
import { AuthContext } from '../AuthContext'

function useCurrentUser() {
  const { currentUserId } = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState(null)

  const fetchCurrentUser = async () => {
    const { data } = await api.get(`user/${currentUserId}`)
    setCurrentUser(data)
  }

  return { currentUser, fetchCurrentUser }
}

export default useCurrentUser
