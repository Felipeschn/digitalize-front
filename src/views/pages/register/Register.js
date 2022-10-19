import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormFloating,
  CFormLabel,
  CRow,
  CTooltip,
  CAlert,
} from '@coreui/react'
import api from '../../../api'

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const EMAIL_REGEX = /^\S+@\S+\.\S+$/

function Register() {
  const navigate = useNavigate()
  const ref = useRef()
  const errRef = useRef()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [validEmailAdress, setValidEmailAdress] = useState(false)

  const [password, setPassword] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    ref.current?.focus()
  }, [])

  useEffect(() => {
    setValidEmailAdress(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password))
    setValidMatch(password === matchPwd)
  }, [password, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [firstName, lastName, email, password, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!PWD_REGEX.test(password)) {
      setErrMsg('Invalid Entry')
      return
    }

    try {
      const userRegisterPayload = {
        firstName,
        lastName,
        email,
        password,
      }
      await api.post('user/register', userRegisterPayload)
      navigate('/login')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor')
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current?.focus()
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-left">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-2">
              <CCardBody className="p-3">
                <h1>Cadastro</h1>
                {errMsg.length > 0 && (
                  <CAlert color="danger" ref={errRef} style={{ textAlign: 'center' }}>
                    {errMsg}
                  </CAlert>
                )}
                <CForm onSubmit={handleSubmit}>
                  <p className="text-medium-emphasis">Crie sua conta</p>
                  <CRow xs={{ gutter: 3 }} className="mb-3">
                    <CCol md>
                      <CFormFloating>
                        <CFormInput
                          type="text"
                          id="firstName"
                          ref={ref}
                          autoComplete="off"
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                          valid={firstName.length > 0}
                        />
                        <CFormLabel htmlFor="firstName">Primeiro nome</CFormLabel>
                      </CFormFloating>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutter: 3 }} className="mb-3">
                    <CCol md>
                      <CFormFloating>
                        <CFormInput
                          type="text"
                          id="lastName"
                          autoComplete="off"
                          required
                          onChange={(e) => setLastName(e.target.value)}
                          valid={lastName.length > 0}
                        />
                        <CFormLabel htmlFor="secondName">Sobrenome</CFormLabel>
                      </CFormFloating>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutter: 3 }} className="mb-3">
                    <CCol md>
                      <CFormFloating>
                        <CFormInput
                          type="email"
                          id="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          valid={validEmailAdress}
                          invalid={!validEmailAdress && email.length < 0}
                        />
                        <CFormLabel htmlFor="email">E-mail</CFormLabel>
                      </CFormFloating>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutter: 3 }} className="mb-3">
                    <CCol md>
                      <CTooltip
                        placement="right"
                        content="Mínimo de oito caracteres, pelo menos uma letra e um número"
                      >
                        <CFormFloating>
                          <CFormInput
                            type="password"
                            id="pwd"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            valid={validPwd}
                          />
                          <CFormLabel htmlFor="pwd">Senha</CFormLabel>
                        </CFormFloating>
                      </CTooltip>
                    </CCol>
                  </CRow>
                  <CRow xs={{ gutter: 3 }} className="mb-3">
                    <CCol md>
                      <CFormFloating>
                        <CFormInput
                          type="password"
                          id="matchPwd"
                          required
                          onChange={(e) => setMatchPwd(e.target.value)}
                          valid={validPwd && matchPwd.length > 0}
                          invalid={!validMatch && matchPwd.length > 0}
                        />
                        <CFormLabel htmlFor="matchPwd">Confirme senha</CFormLabel>
                      </CFormFloating>
                    </CCol>
                  </CRow>
                  <div className="d-grid">
                    <CButton type="submit" color="primary">
                      Criar conta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
