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

function CreateContractModal({ open, handleClose, refreshList }) {
  const { currentUserId } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [contractFile, setContractFile] = useState({})
  const [openCreateModal, setOpenCreateModal] = useState(open)
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post(
        `/docfile/${currentUserId}/upload`,
        {
          title,
          description,
          docType: 'contract',
          file: contractFile,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
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
      setDescription(text.slice(0, 512))
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
          <CModalTitle>Anexar contrato</CModalTitle>
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
          <CRow xs={{ gutter: 3 }}>
            <CCol md>
              <CFormFloating>
                <CFormTextarea
                  type="text"
                  id="description"
                  value={description}
                  style={{ height: '100px' }}
                  onChange={(e) => setFormattedContent(e.target.value)}
                />
                <p style={{ textAlign: 'right' }} className="mb-0">
                  {description.length}/512
                </p>
                <CFormLabel htmlFor="description">Descrição</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
          <CRow xs={{ gutter: 3 }} className="mb-3">
            <CCol md className="mt-0">
              <CFormLabel htmlFor="formFile">Arquivo</CFormLabel>
              <CFormInput
                type="file"
                required
                id="formFile"
                accept="image/jpeg, image/pjpeg, image/png, application/pdf"
                onChange={(e) => setContractFile(e.target.files[0])}
              />
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
export default CreateContractModal
