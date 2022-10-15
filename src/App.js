import './scss/style.scss'

import React, { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

const AuthProvider = React.lazy(() => import('./context/AuthContext'))

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
)

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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              path="*"
              name="Home"
              element={
                <RequireAuth>
                  <DefaultLayout />
                </RequireAuth>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

// <Route exact path="/404" name="Page 404" element={<Page404 />} />
export default App
