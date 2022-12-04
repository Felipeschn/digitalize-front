import React, { useState, useCallback, useContext } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CButton,
  CFormFloating,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import api from 'src/api'

import { AuthContext } from 'src/context/AuthContext'

function CreateNotationModal({ open, handleClose, refreshList }) {
  const { currentUserId } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [openCreateModal, setOpenCreateModal] = useState(open)
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post(`/docfile/${currentUserId}/create`, {
        title,
        description,
        docType: 'notation',
      })
      refreshList()
      setOpenCreateModal(false)
      handleClose()
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }

  const setFormattedContent = useCallback(
    (text) => {
      setDescription(text.slice(0, 4090))
    },
    [setDescription],
  )

  return (
    <CModal
      alignment="center"
      scrollable
      backdrop="static"
      size="lg"
      visible={openCreateModal}
      onClose={() => {
        setOpenCreateModal(false)
        handleClose()
      }}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>Criar anotação</CModalTitle>
        </CModalHeader>
        {errMsg.length > 0 && (
          <CAlert color="danger" style={{ textAlign: 'center' }}>
            {errMsg}
          </CAlert>
        )}
        <CModalBody>
          <CRow xs={{ gutter: 3 }} className="mb-3">
            <CCol md>
              <CFormFloating>
                <CFormInput
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <CFormLabel htmlFor="title">Título</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow xs={{ gutter: 3 }} className="mb-3">
            <CCol md>
              <CFormFloating>
                <CFormTextarea
                  type="text"
                  id="description"
                  value={description}
                  style={{ height: '300px' }}
                  onChange={(e) => setFormattedContent(e.target.value)}
                />
                <p style={{ textAlign: 'right' }}>{description.length}/4090</p>
                <CFormLabel htmlFor="description">Descrição</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton style={{ color: 'white' }} type="submit" color="dark">
            Criar
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}
export default CreateNotationModal
