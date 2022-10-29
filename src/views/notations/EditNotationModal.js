import React, { useState, useCallback } from 'react'
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

function EditNotationModal({ notation, open, close }) {
  const [title, setTitle] = useState(notation.title)
  const [description, setDescription] = useState(notation.description)
  const [openEditModal, setOpenEditModal] = useState(open)
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title,
        description,
        docType: 'notation',
      }
      await api.put(`/docfile/${notation.docFileId}/update`, payload).then(() => {
        setOpenEditModal(false)
      })
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
      visible={openEditModal}
      onClose={() => {
        setOpenEditModal(false)
        close()
      }}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>Editar anotação</CModalTitle>
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
          <CButton type="submit" color="primary">
            Salvar edição
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}
export default EditNotationModal
