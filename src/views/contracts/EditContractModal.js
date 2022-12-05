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

function EditContractModal({ contract, open, handleClose, refreshList }) {
  const [title, setTitle] = useState(contract.title)
  const [description, setDescription] = useState(contract.description)
  const [openEditModal, setOpenEditModal] = useState(open)
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/docfile/${contract.docFileId}/update`, {
        title,
        description,
        docType: 'contract',
      })
      refreshList()
      setOpenEditModal(false)
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
      visible={openEditModal}
      onClose={() => {
        setOpenEditModal(false)
        handleClose()
      }}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>Editar contrato</CModalTitle>
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
                <p style={{ textAlign: 'right' }}>{description.length}/512</p>
                <CFormLabel htmlFor="description">Descrição</CFormLabel>
              </CFormFloating>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton type="submit" color="primary">
            Salvar contrato
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}
export default EditContractModal
