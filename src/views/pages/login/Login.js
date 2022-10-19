import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'src/context/AuthContext'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CAlert,
  CRow,
  CFormFloating,
  CFormLabel,
} from '@coreui/react'

function Login() {
  const navigate = useNavigate()
  const { authenticated, handleLogin } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (authenticated) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin({ email, password })
    } catch (error) {
      if (error?.response.status === 401) {
        setErrMsg('Email ou senha incorreta')
      } else {
        setErrMsg('Sem resposta do servidor')
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-left">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-5">
                <CCardBody>
                  <h1>Login</h1>
                  <CForm onSubmit={handleSubmit}>
                    <p className="text-medium-emphasis">Faça login em sua conta</p>
                    <CRow xs={{ gutter: 3 }} className="mb-3">
                      <CCol md>
                        <CFormFloating>
                          <CFormInput
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <CFormLabel htmlFor="email">Email</CFormLabel>
                        </CFormFloating>
                      </CCol>
                    </CRow>
                    <CRow xs={{ gutter: 3 }} className="mb-3">
                      <CCol md>
                        <CFormFloating>
                          <CFormInput
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <CFormLabel htmlFor="password">Senha</CFormLabel>
                        </CFormFloating>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={4}>
                        <CButton type="submit" color="primary" className="px-4">
                          Entrar
                        </CButton>
                      </CCol>
                      {errMsg.length > 0 && (
                        <CCol xs={8}>
                          <CAlert
                            color="danger"
                            style={{ textAlign: 'center', padding: '6px 16px' }}
                          >
                            {errMsg}
                          </CAlert>
                        </CCol>
                      )}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <div>
                  <h2>Cadastre-se</h2>
                  <CButton
                    onClick={() => navigate('/register')}
                    color="primary"
                    className="mt-3"
                    active
                    tabIndex={-1}
                  >
                    Register Now!
                  </CButton>
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
