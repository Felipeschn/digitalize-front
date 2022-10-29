import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from './routes'
import './scss/style.scss'
import { AppSidebar, AppHeader } from './components/index'
import RequireAuth from './utils/RequireAuth'

// Contexts
const AuthProvider = React.lazy(() => import('./context/AuthContext'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={loading}>
          <Routes>
            {routes.map(
              (route, idx) =>
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={
                      <RequireAuth>
                        <AppSidebar />
                        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                          <AppHeader />
                          <div className="body flex-grow-1 px-3">
                            <route.element />
                          </div>
                        </div>
                      </RequireAuth>
                    }
                  />
                ),
            )}
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  )
}

export default App
